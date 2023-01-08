from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta: 
        # Meta inner class used to change the behavior of model fields
        # Extra validation logic in the form of reusable components
        model = Task
        fields = '__all__'