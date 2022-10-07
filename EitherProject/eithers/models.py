from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.
class Eithers(models.Model):
    title = models.CharField(max_length=20)
    issue_a = models.CharField(max_length=20)
    issue_b = models.CharField(max_length=20)
    issue_a_vote = models.IntegerField()
    issue_b_vote = models.IntegerField()

class Comment(models.Model):
    eithers = models.ForeignKey(Eithers, on_delete=models.CASCADE)
    pick = models.CharField(max_length=20)
    content = models.TextField()