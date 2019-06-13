from .models import Campsite, Trip, Gear, ChecklistItem                                                          
from rest_framework import serializers
                                                         
class CampsiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campsite
        fields = ('id', 'name', 'location', 'description', 'campsite_type', 'campsiteAPI_id')

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

class PlacesSeriailzer(serializers.Serializer):
    id = serializers.CharField(max_length=100)

    def list(self,  validated_data):
        return {id: "test"}

