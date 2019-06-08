from .views import CampsiteViewSet, TripViewSet, GearViewSet, ChecklistItemViewSet
from rest_framework import routers
                                                         
router = routers.SimpleRouter()

router.register('campsite', CampsiteViewSet)
router.register('trip', TripViewSet)
router.register('gear', GearViewSet)
router.register('checklist', ChecklistItemViewSet)
 
urlpatterns = router.urls