from django.urls import path
from . import view
from .views import user
from .views import pages

urlpatterns = [
    path('', pages.board_page, name='pizarron'),
    path('login', user.login_view, name='login'),
    path('board', user.board_insert_view, name='insertion_board'),
    path('board/<int:autor>', user.boards_by_author, name='get_board'),
    path('board/paint/<int:id>', user.board_update_view, name='get_board'),
    path('board/paint/delete/<int:id>', user.board_delete_view, name='get_board'),
    path('info', user.info_user_view, name='info'),
]
