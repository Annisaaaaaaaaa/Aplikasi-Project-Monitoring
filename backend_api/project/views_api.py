from rest_framework import generics, filters
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer

from django.http import HttpResponse
from openpyxl import Workbook
from .models import Project
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

import PyPDF2
from django.http import JsonResponse

def import_from_pdf(request):
    if request.method == 'POST' and request.FILES['pdf_file']:
        pdf_file = request.FILES['pdf_file']
        # Membaca file PDF yang dikirim melalui permintaan HTTP
        pdf_reader = PyPDF2.PdfFileReader(pdf_file)
        text = ''
        # Mendapatkan teks dari semua halaman PDF
        for page_num in range(pdf_reader.numPages):
            text += pdf_reader.getPage(page_num).extractText()
        
        # Proses teks PDF sesuai kebutuhan
        # Misalnya, split teks menjadi baris-baris data
        data = [line.strip().split(',') for line in text.split('\n')]
        
        return JsonResponse({'data': data})
    else:
        return JsonResponse({'error': 'No PDF file provided or incorrect request method'})

# def import_from_excel(request):
#     data = []
#     # Membuka file Excel
#     wb = openpyxl.load_workbook('doc/projects.xlsx')
#     sheet = wb.active
#     # Mengambil data dari setiap baris
#     for row in sheet.iter_rows(values_only=True):
#         data.append(row)

#     return JsonResponse({'data': data})

@csrf_exempt
def import_from_excel(request):
    if request.method == 'POST' and request.FILES['excel_file']:
        excel_file = request.FILES['excel_file']
        try:
            # Membaca file Excel ke DataFrame menggunakan Pandas
            df = pd.read_excel(excel_file)
            
            # Menyimpan data ke database menggunakan Django ORM
            for index, row in df.iterrows():
                Project.objects.create(
                    contract_no=row['Contract No'],  # Sesuaikan dengan nama kolom di file Excel Anda
                    contract_date=row['Contract Date'],  # Sesuaikan dengan nama kolom di file Excel Anda
                    am=row['AM'],
                    pic=row['PIC'],
                    pm=row['PM'],
                )
            
            return JsonResponse({'message': 'projects imported successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

# def import_from_csv(request):
#     data = []
#     # Membaca file CSV
#     with open('doc/projects.csv', 'r') as file:
#         csv_reader = csv.reader(file)
#         # Mengambil data dari setiap baris
#         for row in csv_reader:
#             data.append(row)

#     return JsonResponse({'data': data})

def import_from_csv(request):
    if request.method == 'POST':
        file = request.FILES['file']
        data = []

        # Membaca file CSV
        decoded_file = file.read().decode('utf-8').splitlines()
        csv_reader = csv.reader(decoded_file)
        
        # Mengambil data dari setiap baris
        for row in csv_reader:
            data.append(row)

        return JsonResponse({'data': data})
    else:
        return JsonResponse({'error': 'Metode request tidak valid.'})

# def import_from_json(request):
#     data = []
#     # Membaca file JSON
#     with open('doc/projects.json', 'r') as file:
#         data = json.load(file)

#     return JsonResponse({'data': data})

def import_from_json(request):
    if request.method == 'POST':
        file = request.FILES['file']
        data = []

        # Membaca file JSON
        decoded_file = file.read().decode('utf-8')
        data = json.loads(decoded_file)

        return JsonResponse({'data': data})
    else:
        return JsonResponse({'error': 'Metode request tidak valid.'})

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
    field_names = ['Contract No', 'Contract Date', 'AM', 'PIC', 'PM']

    # Set up data rows
    data = [field_names]
    for project in projects:
        row = [
            project.contract_no,
            project.contract_date.strftime('%Y-%m-%d'),
            project.am.email,
            project.pic.email,
            project.pm.email
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
            'Id': project.id,
            'Contract No': project.contract_no,
            'Contract Date': project.contract_date.strftime('%Y-%m-%d'),
            'AM': project.am.email,
            'PIC': project.pic.email,
            'PM': project.pm.email,
            'Created At': project.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'Updated At': project.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
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
    field_names = ['ID','Contract No', 'Contract Date', 'AM', 'PIC', 'PM', 'Created At', 'Updated At']
    writer.writerow(field_names[:-1])  # Exclude the 'Download Link' field

    # Write data rows to the CSV file
    projects = Project.objects.all()
    for project in projects:
        # Create a list with formatted values
        row_data = [
            project.id,
            project.contract_no,
            project.contract_date.strftime('%Y-%m-%d'),
            project.am.email,
            project.pic.email,
            project.pm.email,
            project.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            project.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
        ]

        # Write the row to the CSV file
        writer.writerow(row_data[:-1])  # Exclude the 'Download Link' field

    return response

from django.http import HttpResponse
from openpyxl import Workbook
from openpyxl.writer.excel import save_workbook
from io import BytesIO
from .models import Project

def export_projects_to_excel(request):
    # Create a new Excel workbook and add a worksheet
    wb = Workbook()
    ws = wb.active

    # Define column names manually
    field_names = ['ID', 'Contract No', 'Contract Date', 'AM', 'PIC', 'PM', 'Created At', 'Updated At']

    # Write headers to the worksheet
    ws.append(field_names[:-1])  # Exclude the 'Download Link' field

    projects = Project.objects.all()

    # Write data to the worksheet
    for project in projects:
        row_data = [
            project.id,
            project.contract_no,
            project.contract_date.strftime('%Y-%m-%d') if project.contract_date else '',  # Check for None or empty date
            project.am.email,
            project.pic.email,
            project.pm.email,
            project.created_at.strftime('%Y-%m-%d %H:%M:%S') if project.created_at else '',  # Check for None or empty date
            project.updated_at.strftime('%Y-%m-%d %H:%M:%S') if project.updated_at else '',  # Check for None or empty date
        ]
        ws.append(row_data)

    # Create a BytesIO buffer to save the workbook
    buffer = BytesIO()

    # Save the workbook to the buffer
    save_workbook(wb, buffer)

    # Seek to the beginning of the buffer
    buffer.seek(0)

    # Create the HttpResponse object with the appropriate Excel header
    response = HttpResponse(buffer, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=projects.xlsx'

    return response



