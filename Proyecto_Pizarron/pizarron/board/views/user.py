from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from board.models import Board
from board.serializers import BoardSerializer, UserSerializer
from ..generic_clases.serializers import ResponseSerializer
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
# Create your views here.
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


@api_view(['POST'])
def login_view(request):

    try:
        if request.method == 'POST':
            username = request.data.get('username')
            password = request.data.get('password')
            try:
                user = User.objects.get(username=username)

                if user is not None:
                    try:
                        user = authenticate(request, username=username,
                                            password=password)
                        login(request, user)
                        serializer = UserSerializer(user.__dict__.copy())
                        return JsonResponse(data=serializer.data, status=status.HTTP_200_OK)
                    except:
                        return JsonResponse(data={'message': "Contraseña incorrecta"}, status=status.HTTP_400_BAD_REQUEST)

            except:
                user = User.objects.create_user(
                    username=username,
                    password=password)
                try:
                    user.save()
                    user = authenticate(request, username=username,
                                        password=password)
                    login(request, user)
                    serializer = UserSerializer(user.__dict__.copy())
                    return JsonResponse(data=serializer.data, status=200)
                except:
                    return JsonResponse(data={'message': "No es posible iniciar sesción"}, status=401)
        else:
            return JsonResponse({'message': "Metodo no compatible"}, status=400)
    except Exception as e:
        print(f"Ocurrió una excepción: {str(e)}")
        return JsonResponse(data={'message': "Ocurrio un error interno"}, status=500)


def info_user_view(request):
    print(request.user)
    return JsonResponse({'message': "Algo"}, status=200)


@api_view(['POST'])
def board_insert_view(request):
    try:
        if request.method == 'POST':
            print(request.data)
            serializer = BoardSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            return JsonResponse({'message': "Metodo no compatible"}, status=400)
    except:
        return JsonResponse(data={'message': "Ocurrio un error interno"}, status=500)


@api_view(['POST'])
def board_update_view(request, id):
    board = get_object_or_404(Board, pk=id)
    try:
        if request.method == 'POST':
            data = request.data
            print(data)
            board.title = data.get('title', board.title)
            board.paint = data.get('paint', board.paint)
            board.colors = json.loads(data.get('colors', board.colors))
            board.save()

            return JsonResponse({'message': "Actualizado"}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'message': "Metodo no compatible"}, status=400)
    except:
        return JsonResponse(data={'message': "Ocurrio un error interno"}, status=500)


@api_view(['GET'])
def boards_by_author(request, autor):
    try:
        boards = Board.objects.filter(autor__id=autor)
        serializer = BoardSerializer(boards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "Author not found."}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['DELETE'])
def board_delete_view(request, id):
    board = get_object_or_404(Board, pk=id)
    try:
        if request.method == 'DELETE':
            board.delete()

            return JsonResponse({'message': "Eliminado"}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'message': "Metodo no compatible"}, status=400)
    except:
        return JsonResponse(data={'message': "Ocurrio un error interno"}, status=500)
