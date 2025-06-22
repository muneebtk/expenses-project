from django.urls import path

from expenses.views import ExpenseDetailView, ExpenseListCreateView, ExpenseSummaryView


urlpatterns = [
    path("expenses/", ExpenseListCreateView.as_view(), name="expense-list-create"),
    path("expenses/<uuid:pk>/", ExpenseDetailView.as_view(), name="expense-detail"),
    path("summary/", ExpenseSummaryView.as_view(), name="expense-summary"),
]
