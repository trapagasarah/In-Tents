from django.db import models

class Campsite(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    description = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.location} "


class Trip(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    campers = models.IntegerField()
    campsite = models.ForeignKey(Campsite, on_delete=models.CASCADE, related_name='trip')

    def __str__(self):
        return f"{self.name}"

class Gear(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    quantity = models.IntegerField()

    def __str__(self):
        return self.name

class ChecklistItem(models.Model):
    camping_item = models.CharField(max_length=100)
    quantity = models.IntegerField()
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='checklist')
    is_checked = models.BooleanField()

    def __str__(self):
        return self.camping_item

