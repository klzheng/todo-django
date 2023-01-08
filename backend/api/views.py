from django.shortcuts import render
from django.http import JsonResponse

# allows us to use the @api-views decorator
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'View List':'/todo-list/',
        'View Item':'/todo-item/<str:id>/',
        'Create Item':'/todo-create/',
        'Update Item':'/todo-update/<str:id>/',
        'Delete Item':'/todo-delete/<str:id>/',
    }

    return Response(api_urls)


@api_view(['GET'])
def todoList(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def todoItem(request, id):
    task = Task.objects.get(id=id)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def todoCreate(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['PUT'])
def todoUpdate(request, id):
    task = Task.objects.get(id=id)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def todoDelete(request, id):
    task = Task.objects.get(id=id)
    task.delete

    return Response("Item successfully deleted!")