from django.contrib import admin
from .models import Campsite, Trip, Gear, ChecklistItem

admin.site.register([Campsite, Trip, Gear, ChecklistItem])