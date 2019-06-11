from .views import CampsiteViewSet, TripViewSet, GearViewSet, ChecklistItemViewSet
from rest_framework import routers
                                                         
router = routers.SimpleRouter()

router.register('campsites', CampsiteViewSet)
router.register('trips', TripViewSet)
router.register('gear', GearViewSet)
router.register('checklistitems', ChecklistItemViewSet)
 
urlpatterns = router.urls