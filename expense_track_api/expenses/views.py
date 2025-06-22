from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Sum


from expenses.permissions import IsOwnerOrAdmin
from expenses.models import Expense
from expenses.serializers import ExpenseSerializer


class ExpenseListCreateView(generics.ListCreateAPIView):
    """
    GET: List expenses with filters.
    POST: Create a new expense for the authenticated user.
    """

    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Return a queryset of expenses. Admin users can see all expenses,
        while regular users only see their own.
        """
        user = self.request.user
        print(user.is_superuser, "is super")
        if user.is_superuser:
            queryset = Expense.objects.all()
        else:
            queryset = Expense.objects.filter(user=user)
        start_date = self.request.query_params.get("startDate")
        end_date = self.request.query_params.get("endDate")
        category: str = self.request.query_params.get("category")
        if start_date and end_date:
            queryset = queryset.filter(date__range=[start_date, end_date])
        elif start_date:
            queryset = queryset.filter(date__gte=start_date)
        elif end_date:
            queryset = queryset.filter(date__lte=end_date)

        if category:
            queryset = queryset.filter(category=category.lower())
        print("Filtered Queryset:", queryset, category)
        return queryset

    def perform_create(self, serializer: ExpenseSerializer):
        """
        Save the expense with the authenticated user as the owner.
        """
        serializer.save(user=self.request.user)


class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Retrieve an expense by ID.
    PUT: Update an expense by ID.
    DELETE: Delete an expense by ID.
    """

    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]


class ExpenseSummaryView(APIView):
    """
    GET: Provide a summary of expenses by category for the authenticated user.
    """

    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get(self, request):
        """
        Return a summary of expenses by category for the authenticated user.
        """
        user = request.user
        if user.is_superuser:
            expenses = Expense.objects.all()
        else:
            expenses = Expense.objects.filter(user=user)
        summary = expenses.values("category").annotate(total=Sum("amount"))
        return Response(summary, status=status.HTTP_200_OK)
