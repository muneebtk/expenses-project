from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate

from users.utils import get_tokens_for_user
from users.serializers import LoginSerializer, SignupSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class SignupView(APIView):
    """
    POST: Create a new user account.
    """
    
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Handle user registration.
        """
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    POST: Authenticate a user and return a token.
    """
    
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Handle user login.
        """
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )
            if user is not None:
                tokens = get_tokens_for_user(user)
                user_serializer = UserSerializer(user, many=False)
                tokens["user"] = user_serializer.data
                return Response(tokens, status=status.HTTP_200_OK)
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """Handle user logout"""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Blacklist the user's refresh token to prevent further access.
        """
        try:
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the refresh token

            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
