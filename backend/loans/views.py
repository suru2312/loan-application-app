from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import LoanApplication, Document
from .serializers import LoanSerializer

@api_view(['POST'])
def create_loan(request):
    print("FILES:", request.FILES)

    serializer = LoanSerializer(data=request.data)

    if serializer.is_valid():
        loan = serializer.save()

        # 🔥 HANDLE MULTIPLE FILES
        files = request.FILES.getlist('documents')

        for f in files:
            Document.objects.create(loan=loan, file=f)

        return Response({"message": "Loan submitted successfully"}, status=201)

    print(serializer.errors)
    return Response(serializer.errors, status=400)