from rest_framework import generics, filters
from rest_framework.response import Response
from .models import ProjectDocument
from .serializers import ProjectDocumentSerializer

from openpyxl import Workbook
from openpyxl.styles import Font, NamedStyle
from django.http import HttpResponse
from .models import ProjectDocument
from django.utils import timezone


from django.http import FileResponse
import tempfile

def export_documents_to_excel(request):
    # Create a new Excel workbook and add a worksheet
    wb = Workbook()
    ws = wb.active

    # Define column names manually
    field_names = ['Project', 'Uploader', 'Name', 'Upload Date', 'Category', 'Description', 'Created At', 'Updated At', 'Download Link']

    # Write headers to the worksheet
    ws.append(field_names[:-1])  # Exclude the 'Download Link' field

    documents = ProjectDocument.objects.all()

    # Create a named style for hyperlinks
    hyperlink_style = NamedStyle(name='hyperlink_style', font=Font(color="0000FF", underline='single'))

    # Write data to the worksheet
    for document, row_num in zip(documents, range(2, len(documents) + 2)):
        # Convert upload_date to string without timezone information
        upload_date_str = document.upload_date.strftime('%Y-%m-%d')

        # Create a list with formatted values
        row_data = [
            document.project.name if document.project else '',
            document.uploader.role if document.uploader else '',
            document.name,
            upload_date_str,
            document.category if document.category else '',
            document.description if document.description else '',
            document.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            document.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            request.build_absolute_uri(document.document_file.url),  # Download Link
        ]

        for col_num, value in enumerate(row_data):
            ws.cell(row=row_num, column=col_num + 1).value = value

        # Add a hyperlink to the 'Download Link' column
        download_link_cell = ws.cell(row=row_num, column=len(field_names)).value
        ws.cell(row=row_num, column=len(field_names)).hyperlink = download_link_cell
        ws.cell(row=row_num, column=len(field_names)).style = hyperlink_style

    # Save workbook to a temporary file
    tmp_file = tempfile.NamedTemporaryFile(delete=False)
    wb.save(tmp_file.name)
    tmp_file.close()

    # Serve the file using Django FileResponse
    response = FileResponse(open(tmp_file.name, 'rb'), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=documents.xlsx'

    return response


#Create dan List
class ProjectDocumentListCreate(generics.ListCreateAPIView):
    queryset = ProjectDocument.objects.all()
    serializer_class = ProjectDocumentSerializer

# Edit
class ProjectDocumentRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = ProjectDocument.objects.all()
    serializer_class = ProjectDocumentSerializer

# Delete
class ProjectDocumentDestroy(generics.DestroyAPIView):
    queryset = ProjectDocument.objects.all()
    serializer_class = ProjectDocumentSerializer

# Search
class ProjectDocumentListSearch(generics.ListCreateAPIView):
    queryset = ProjectDocument.objects.all()
    serializer_class = ProjectDocumentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'name'] 

# ASC, DSC
class ProjectDocumentList(generics.ListCreateAPIView):
    queryset = ProjectDocument.objects.all()
    serializer_class = ProjectDocumentSerializer

    def list(self, request, *args, **kwargs):
        # Mendapatkan nilai 'order_by' dan 'order' dari parameter query string
        order_by = request.query_params.get('order_by', 'name')
        order = request.query_params.get('order', 'asc')

        # Validasi nilai 'order'
        if order not in ['asc', 'desc']:
            return Response({"error": "Invalid order value. Use 'asc' or 'desc'."}, status=400)

        # Validasi nilai 'order_by'
        valid_order_by_fields = ['name', 'project_id', 'uploader_id' , 'upload_date', 'category']  
        if order_by not in valid_order_by_fields:
            return Response({"error": f"Invalid order_by value. Use one of {valid_order_by_fields}."}, status=400)

        # Mengurutkan queryset berdasarkan bidang yang dipilih
        queryset = self.filter_queryset(self.get_queryset().order_by(f"{'-' if order == 'desc' else ''}{order_by}"))

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)