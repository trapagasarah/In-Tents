from .models import Campsite, Trip, Gear, ChecklistItem                                                          
from rest_framework import serializers
from django.core.serializers.json import DjangoJSONEncoder

                                                        
class CampsiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campsite
        fields = ('id', 'name', 'location', 'description')

class ChecklistItemSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = ChecklistItem
        fields = ('id', 'camping_item', 'quantity', 'is_checked', 'trip')
                                                         
                                                         
class TripSerializer(serializers.ModelSerializer):
    checklist = ChecklistItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Trip
        fields = ('id', 'name', 'start_date', 'end_date', 'campsite', 'campers', 'checklist')

class GearSerializer(serializers.ModelSerializer):

    class Meta:
        model = Gear
        fields = ('id', 'name', 'description', 'quantity')    


