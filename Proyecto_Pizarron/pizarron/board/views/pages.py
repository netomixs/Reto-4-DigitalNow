from django.http import HttpResponse
from django.shortcuts import render

def board_page(request):
    return render(request, 'index.html')
