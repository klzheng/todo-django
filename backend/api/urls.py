from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('todo-list/', views.todoList, name="todo-list"),
    path('todo-item/<str:id>/', views.todoItem, name="todo-item"),
    path('todo-create/', views.todoCreate, name="todo-create"),
    path('todo-update/<str:id>', views.todoUpdate, name="todo-update"),
    path('todo-delete/<str:id>', views.todoDelete, name="todo-delete"),
]