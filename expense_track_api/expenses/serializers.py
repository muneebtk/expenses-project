from rest_framework import serializers
from .models import Expense
from datetime import datetime


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ["id", "title", "amount", "category", "date", "notes", "user"]
        read_only_fields = ["id", "user"]

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value

    def validate_date(self, value):
        if value > datetime.today().date():
            raise serializers.ValidationError("Date cannot be in the future.")
        return value
