from rest_framework import generics, filters
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer

from django.http import HttpResponse
from openpyxl import Workbook
from openpyxl.styles import Font, NamedStyle

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
import PyPDF2
from django.http import JsonResponse
import openpyxl
import json
import csv
from django.http import FileResponse
import tempfile
from io import BytesIO
from reportlab.pdfgen import canvas
from django.core.files.base import ContentFile
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from import_export.widgets import ForeignKeyWidget
from tablib import Dataset
from .resources import ProjectResource
from datetime import datetime

from .models import EngineerProject
from .serializers import EngineerProjectSerializer

#Create dan List
class ProjectListCreate(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

# Edit
class ProjectRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

# Delete
class ProjectDestroy(generics.DestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

# Search
class ProjectListSearch(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'name'] 


# ASC, DSC
class ProjectList(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def list(self, request, *args, **kwargs):
        # Mendapatkan nilai 'order_by' dan 'order' dari parameter query string
        order_by = request.query_params.get('order_by', 'year')
        order = request.query_params.get('order', 'asc')

        # Validasi nilai 'order'
        if order not in ['asc', 'desc']:
            return Response({"error": "Invalid order value. Use 'asc' or 'desc'."}, status=400)

        # Validasi nilai 'order_by'
        valid_order_by_fields = ['year', 'name']  
        if order_by not in valid_order_by_fields:
            return Response({"error": f"Invalid order_by value. Use one of {valid_order_by_fields}."}, status=400)

        # Mengurutkan queryset berdasarkan bidang yang dipilih
        queryset = self.filter_queryset(self.get_queryset().order_by(f"{'-' if order == 'desc' else ''}{order_by}"))

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class EngineerProjectListCreate(generics.ListCreateAPIView):
    queryset = EngineerProject.objects.all()
    serializer_class = EngineerProjectSerializer

class EngineerProjectRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = EngineerProject.objects.all()
    serializer_class = EngineerProjectSerializer

class EngineerProjectDestroy(generics.DestroyAPIView):
    queryset = EngineerProject.objects.all()
    serializer_class = EngineerProjectSerializer

@csrf_exempt
def import_projects(request):
    if request.method == 'POST':
        dataset = Dataset()

        # Set headers for the dataset
        dataset.headers = [
            'year', 'pid', 'name', 'description', 'customer',
            'sales', 'amount_tax', 'amount_exc_tax', 'contract_no', 'contract_date',
            'am', 'pic', 'pm', 'start_date', 'end_date',
            'status', 'top', 'sow', 'oos', 'detail',
            'remarks', 'weight', 'priority', 'type', 'market_segment',
            'tech_use', 'resiko', 'beban_proyek', 'completion_percentage'
        ]

        new_projects = request.FILES['file']

        if not new_projects.name.endswith('xlsx'):
            return JsonResponse({'error': 'File must be in Excel (xlsx) format.'})

        imported_data = dataset.load(new_projects.read(), 'xlsx')

        for data_row in imported_data:
            # ... (lanjutkan debug di bagian lain)

            # Convert date strings to datetime objects if needed
            date_fields = ['contract_date', 'start_date', 'end_date']
            for field in date_fields:
                if field in data_row and data_row[field]:
                    try:
                        data_row[field] = datetime.strptime(data_row[field], '%Y-%m-%d').date()
                    except ValueError:
                        return JsonResponse({'error': f'Invalid date format for {field}.'})

            # Creating a resource instance
            resource = ProjectResource()
            
            # Pass the dataset directly to import_data
            result = resource.import_data(dataset, dry_run=True, raise_errors=False)

            if not result.has_errors():
                # You can choose to use dry_run=False if the import is successful
                # resource.import_data(dataset, dry_run=False)

                return JsonResponse({'success': 'Projects imported successfully.'})
            else:
                return JsonResponse({'error': 'There was an error importing the file.'})

    return JsonResponse({'error': 'Invalid request method.'})

def export_projects_to_pdf(request):
    projects = Project.objects.all()

    # Create a buffer to store PDF data
    buffer = BytesIO()

    table_width = 500  # You should adjust this based on your actual table width
    left_margin = (letter[1] - table_width) / 2
    right_margin = (letter[1] - table_width) / 2

    # Create the PDF object, using the buffer as its "file"
    pdf = SimpleDocTemplate(buffer, pagesize=landscape(letter), leftMargin=left_margin, rightMargin=right_margin)

    # Set up PDF content
    styles = getSampleStyleSheet()
    style = ParagraphStyle('TableHeader', parent=styles['Heading2'], textColor=colors.black, spaceAfter=6, alignment=1)
    pdf_title = Paragraph("projects Data", style)

    # Define column names manually
    field_names = [
        'year', 'pid', 'name', 'description', 'customer',
        'sales', 'amount_tax', 'amount_exc_tax', 'contract_no', 'contract_date',
        'am', 'pic', 'pm', 'start_date', 'end_date',
        'status', 'top', 'sow', 'oos', 'detail',
        'remarks', 'weight', 'priority', 'type', 'market_segment',
        'tech_use', 'resiko', 'beban_proyek', 'completion_percentage'
    ]

    # Set up data rows
    data = [field_names]
    for project in projects:
        row = [
            str(project.year) if project.year else '',
            project.pid if project.pic else '',
            project.name if project.name else '',
            project.description if project.description else '',
            project.customer.name if project.customer.name else '',
            project.sales.first_name if project.sales.first_name else '',
            str(project.amount_tax) if project.amount_tax else '',
            str(project.amount_exc_tax) if project.amount_exc_tax else '',
            project.contract_no if project.contract_no else '',
            str(project.contract_date) if project.contract_date else '',
            project.am.first_name if project.am.first_name else '',
            project.pic.first_name if project.pic.first_name else '',
            project.pm.first_name if project.pm else '',
            str(project.start_date) if project.start_date else '',
            str(project.end_date) if project.end_date else '',
            project.get_status_display(),
            project.top if project.top else '',
            project.sow if project.sow else '',
            project.oos if project.oos else '',
            project.detail if project.detail else '',
            project.remarks if project.remarks else '',
            str(project.weight) if project.weight else '',
            project.priority if project.priority else '',
            project.type if project.type else '',
            project.market_segment if project.market_segment else '',
            project.tech_use if project.tech_use else '',
            project.resiko if project.resiko else '',
            str(project.beban_proyek) if project.beban_proyek else '',
            str(project.completion_percentage) if project.completion_percentage else '',
        ]
        data.append(row)

    # Create table
    table = Table(data, splitByRow=1)

    # Add style to the table
    style = TableStyle(
        [
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 14),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),  # Ensure vertical alignment to middle
            ('INNERGRID', (0, 0), (-1, -1), 0.25, colors.black),  # Add inner grid for better visibility
            ('BOX', (0, 0), (-1, -1), 0.25, colors.black),
        ]
    )
    table.setStyle(style)

    # Build the PDF
    elements = [pdf_title, table]
    pdf.build(elements)

    # FileResponse sets the Content-Disposition header so that browsers
    # present the option to save the file
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename=projects.pdf'
    response.write(buffer.getvalue())

    return response



def export_projects_to_json(request):
    # Retrieve projects data
    projects = Project.objects.all()

    # Convert data to a list of dictionaries
    data_list = []
    for project in projects:
        data_list.append({
            'Year': str(project.year) if project.year else '',
            'PID': project.pid if project.pic else '',
            'Name': project.name if project.name else '',
            'Description': project.description if project.description else '',
            'Customer': project.customer.name if project.customer.name else '',
            'Sales': project.sales.first_name if project.sales.first_name else '',
            'Amount Tax': str(project.amount_tax) if project.amount_tax else '',
            'Amount Exc Tax': str(project.amount_exc_tax) if project.amount_exc_tax else '',
            'Contract No': project.contract_no if project.contract_no else '',
            'Contract Date': str(project.contract_date) if project.contract_date else '',
            'AM': project.am.first_name if project.am.first_name else '',
            'PIC': project.pic.first_name if project.pic.first_name else '',
            'PM': project.pm.first_name if project.pm.first_name else '',
            'Start Date': str(project.start_date) if project.start_date else '',
            'End Date': str(project.end_date) if project.end_date else '',
            'Status': project.get_status_display(),
            'TOP': project.top if project.top else '',
            'SOW': project.sow if project.sow else '',
            'OOS': project.oos if project.oos else '',
            'Detail': project.detail if project.detail else '',
            'Remarks': project.remarks if project.remarks else '',
            'Weight': str(project.weight) if project.weight else '',
            'Priority': project.priority if project.priority else '',
            'Type': project.type if project.type else '',
            'Market Segment': project.market_segment if project.market_segment else '',
            'Tech Use': project.tech_use if project.tech_use else '',
            'Resiko': project.resiko if project.resiko else '',
            'Beban Proyek': str(project.beban_proyek) if project.beban_proyek else '',
            'Completion Percentage': str(project.completion_percentage) if project.completion_percentage else '',

        })

    # Convert data to JSON
    json_data = json.dumps(data_list, indent=2)

    # Create the HttpResponse object with the appropriate JSON header
    response = HttpResponse(json_data, content_type='application/json')
    response['Content-Disposition'] = 'attachment; filename=projects.json'

    return response

def export_projects_to_csv(request):
    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=projects.csv'

    # Create a CSV writer using the HttpResponse object as the "file."
    writer = csv.writer(response)

    # Write the header row to the CSV file
    field_names = [
        'year', 'pid', 'name', 'description', 'customer',
        'sales', 'amount_tax', 'amount_exc_tax', 'contract_no', 'contract_date',
        'am', 'pic', 'pm', 'start_date', 'end_date',
        'status', 'top', 'sow', 'oos', 'detail',
        'remarks', 'weight', 'priority', 'type', 'market_segment',
        'tech_use', 'resiko', 'beban_proyek', 'completion_percentage'
    ]
    writer.writerow(field_names[:-1])  # Exclude the 'Download Link' field

    # Write data rows to the CSV file
    projects = Project.objects.all()

    for project in projects:
        # Convert date fields to string without timezone information
        contract_date_str = project.contract_date.strftime('%Y-%m-%d') if project.contract_date else ''
        start_date_str = project.start_date.strftime('%Y-%m-%d') if project.start_date else ''
        end_date_str = project.end_date.strftime('%Y-%m-%d') if project.end_date else ''

        row_data = [
            str(project.year) if project.year else '',
            project.pid if project.pic else '',
            project.name if project.name else '',
            project.description if project.description else '',
            project.customer.name if project.customer.name else '',
            project.sales.first_name if project.sales.first_name else '',
            str(project.amount_tax) if project.amount_tax else '',
            str(project.amount_exc_tax) if project.amount_exc_tax else '',
            project.contract_no if project.contract_no else '',
            contract_date_str,
            project.am.first_name if project.am.first_name else '',
            project.pic.first_name if project.pic.first_name else '',
            project.pm.first_name if project.pm else '',
            start_date_str,
            end_date_str,
            project.get_status_display(),
            project.top if project.top else '',
            project.sow if project.sow else '',
            project.oos if project.oos else '',
            project.detail if project.detail else '',
            project.remarks if project.remarks else '',
            str(project.weight) if project.weight else '',
            project.priority if project.priority else '',
            project.type if project.type else '',
            project.market_segment if project.market_segment else '',
            project.tech_use if project.tech_use else '',
            project.resiko if project.resiko else '',
            str(project.beban_proyek) if project.beban_proyek else '',
            str(project.completion_percentage) if project.completion_percentage else '',
        ]

        # Write the row to the CSV file
        writer.writerow(row_data[:-1])  # Exclude the 'Download Link' field

    return response

from openpyxl import Workbook
from openpyxl.worksheet.table import Table, TableStyleInfo

from openpyxl import Workbook
from openpyxl.worksheet.table import Table, TableStyleInfo
from django.http import FileResponse
import tempfile

def export_projects_to_excel(request):
    # Create a new Excel workbook and add a worksheet
    wb = Workbook()
    ws = wb.active

    # Define column names manually
    field_names = [
        'year', 'pid', 'name', 'description', 'customer',
        'sales', 'amount_tax', 'amount_exc_tax', 'contract_no', 'contract_date',
        'am', 'pic', 'pm', 'start_date', 'end_date',
        'status', 'top', 'sow', 'oos', 'detail',
        'remarks', 'weight', 'priority', 'type', 'market_segment',
        'tech_use', 'resiko', 'beban_proyek', 'completion_percentage' 
    ]

    # Write headers to the worksheet
    ws.append(field_names[:-1])  # Exclude the 'Download Link' field

    projects = Project.objects.all()

    hyperlink_style = NamedStyle(name='hyperlink_style', font=Font(color="0000FF", underline='single'))

    # Write data to the worksheet
    for project, row_num in zip(projects, range(2, len(projects) + 2)):
        # Convert date fields to string without timezone information
        contract_date_str = project.contract_date.strftime('%Y-%m-%d') if project.contract_date else ''
        start_date_str = project.start_date.strftime('%Y-%m-%d') if project.start_date else ''
        end_date_str = project.end_date.strftime('%Y-%m-%d') if project.end_date else ''

        sales_name = project.sales.first_name if project.sales else ''
        
        row_data = [
            str(project.year) if project.year else '',
            project.pid if project.pid else '',
            project.name if project.name else '',
            project.description if project.description else '',
            project.customer.name if project.customer.name else '',
            sales_name,
            str(project.amount_tax) if project.amount_tax else '',
            str(project.amount_exc_tax) if project.amount_exc_tax else '',
            project.contract_no if project.contract_no else '',
            contract_date_str,
            project.am.first_name if project.am else '',
            project.pic.first_name if project.pic else '',
            project.pm.first_name if project.pm else '',
            start_date_str,
            end_date_str,
            project.get_status_display(),
            project.top if project.top else '',
            project.sow if project.sow else '',
            project.oos if project.oos else '',
            project.detail if project.detail else '',
            project.remarks if project.remarks else '',
            str(project.weight) if project.weight else '',
            project.priority if project.priority else '',
            project.type if project.type else '',
            project.market_segment if project.market_segment else '',
            project.tech_use if project.tech_use else '',
            project.resiko if project.resiko else '',
            str(project.beban_proyek) if project.beban_proyek else '',
            str(project.completion_percentage) if project.completion_percentage else '',
        ]
        for col_num, value in enumerate(row_data):
            ws.cell(row=row_num, column=col_num + 1).value = value

    # Add filter to header row
    ws.auto_filter.ref = ws.dimensions

    # Save workbook to a temporary file
    tmp_file = tempfile.NamedTemporaryFile(delete=False)
    wb.save(tmp_file.name)
    tmp_file.close()

    # Serve the file using Django FileResponse
    response = FileResponse(open(tmp_file.name, 'rb'), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=projects.xlsx'

    return response
