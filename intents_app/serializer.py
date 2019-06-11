from .models import Campsite, Trip, Gear, ChecklistItem                                                          
from rest_framework import serializers
                                                         
class CampsiteSerializer(serializers.HyperlinkedModelSerializer):
   
    class Meta:
        model = Campsite
        fields = ('id', 'name', 'location', 'description', 'campsite_type', 'campsiteAPI_id')
                                                         
                                                         
class TripSerializer(serializers.HyperlinkedModelSerializer):
    campsite = serializers.PrimaryKeyRelatedField(
        queryset= Campsite.objects.all()
    )
    
    class Meta:
        model = Trip
        fields = ('id', 'name', 'start_date', 'end_date', 'campsite', 'campers', 'checklist')

class GearSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Gear
        fields = ('id', 'name', 'description', 'quantity')

class ChecklistItemSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ChecklistItem
        fields = ('id', 'camping_item', 'quantity')