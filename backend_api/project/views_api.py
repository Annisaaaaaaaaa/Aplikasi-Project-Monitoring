from rest_framework import generics, filters
from .models import Project
from .serializers import ProjectSerializer

from django.http import HttpResponse
from openpyxl import Workbook
from .models import Project

def export_projects_to_excel(request):
    # Create a new Excel workbook and add a worksheet
    wb = Workbook()
    ws = wb.active

    # Write headers to the worksheet
    headers = ['ID', 'Name']  # Replace with your actual field names
    ws.append(headers)

    projects = Project.objects.all()

    # Write data to the worksheet
    for project in projects:
        ws.append([project.id, project.name])  

    # Create a response with the Excel file
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=projects.xlsx'
    wb.save(response)

    return response

#Create dan List
class ProjectListCreate(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

# Edit
class ProjectRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

# Search
class ProjectListSearch(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'name'] 