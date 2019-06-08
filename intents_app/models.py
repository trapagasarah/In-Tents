from django.db import models

class Campsite(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    campsite_type = models.CharField(max_length=100)
    campsiteAPI_id = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.location} - {self.campsite_type}"


class Trip(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    campers = models.IntegerField()
    campsite = models.ForeignKey(Campsite, on_delete=models.CASCADE, related_name='trip')

    def __str__(self):
        return self.start_date

class Gear(models.Model):
    name = CharField(max_length=100)
    description = CharField(max_length=300)
    quantity = IntegerField()

    def __str__(self):
        return self.name

class ChecklistItem(models.Model):
    camping_item = CharField(max_length=100)
    quantity = IntegerField()
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='checklist')
    is_checked = BooleanField()

    def __str__(self):
        return self.camping_item
