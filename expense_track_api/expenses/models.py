import uuid
from django.db import models


class Expense(models.Model):
    CATEGORY_CHOICES = [
        ("food", "Food"),
        ("travel", "Travel"),
        ("utilities", "Utilities"),
        ("miscellaneous", "Miscellaneous"),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(
        max_length=100, choices=CATEGORY_CHOICES, default="misc"
    )
    date = models.DateField()
    notes = models.TextField(blank=True, null=True)
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="expenses"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.amount}"
