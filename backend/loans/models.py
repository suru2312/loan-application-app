from django.db import models

class LoanApplication(models.Model):
    loan_type = models.CharField(max_length=20)
    amount = models.IntegerField()

    name = models.CharField(max_length=100)
    email = models.EmailField()

    pan = models.CharField(max_length=10)
    aadhaar = models.CharField(max_length=12)

    signature = models.TextField(blank=True, null=True)  # base64

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Document(models.Model):
    loan = models.ForeignKey(LoanApplication, on_delete=models.CASCADE, related_name="documents")
    file = models.FileField(upload_to='documents/')