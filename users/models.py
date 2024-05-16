from django.contrib.auth.models import AbstractUser

from django.db import models


class User(AbstractUser):
    pass
class Indicator(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, primary_key=True)
    def __str__(self):
        return self.name

class IndicatorValue(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    indicator = models.ForeignKey(Indicator, on_delete=models.CASCADE)
    value = models.FloatField()
    date_added = models.DateTimeField(auto_now_add=True)