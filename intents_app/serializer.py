from .models import Campsite, Trip, Gear, ChecklistItem                                                          
from rest_framework import serializers
                                                         
class CampsiteSerializer(serializers.HyperlinkedModelSerializer):
   
    class Meta:
        model = Campsite
        fields = ('name', 'location', 'description', 'campsite_type', 'campsiteAPI_id')
                                                         
                                                         
class TripSerializer(serializers.HyperlinkedModelSerializer):
    campsite = serializers.PrimaryKeyRelatedField(
        queryset= Decades.objects.all()
    )
    
    class Meta:
        model = Trip
        fields = ('start_date', 'end_date', 'campsite', 'campers', 'item_checklist')

class GearSerializer(serializer.HyperlinkedModelSerializer):

    class Meta:
        model = Gear
        fields = ('name', 'description', 'quantity')

class ChecklistItemSerializer(serializer.HyperlinkedModelSerializer):

    class Meta:
        model = ChecklistItem
        fields = ('camping_item', 'quantity')