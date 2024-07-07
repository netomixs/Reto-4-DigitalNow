from django.http import HttpResponse
from django.shortcuts import render
 
# Create your views here.
def mi_vista(request):
    return render(request, 'index.html')
