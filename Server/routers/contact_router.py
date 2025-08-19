from ctypes import HRESULT

from fastapi import HTTPException, Query, APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from Server.models.model import ContactInfo
import csv


router = APIRouter()
templates = Jinja2Templates(directory="templates")

#contact_lst = [ContactInfo(id=6,fio='Петов',phone='89224789344',comment='Друг'),ContactInfo(id=7,fio='Петов6',phone='89224789373',comment='{Хороший Друг')]


def load_contactlist(path_name: str) -> None:
    """ Загрузка списка контактов из файла """
    with open(path_name, 'r', encoding='utf-8') as DiskFile:
        reader = csv.DictReader(DiskFile, delimiter=';')
        for row in reader:
            contact_lst.append(ContactInfo(id=row['ID'], fio=row['FIO'], phone=row['PHONE'], comment=row['COMMENT']))

@router.get("/")
async def index():
    """Проверка что API работает"""
    return {"message": "Домашнее задание"}


@router.get("/about",response_class=HTMLResponse,status_code=200 )
async def about(request: Request):
    """О справочнике (Выдает суть ДЗ)"""
    context = {"request": request}
    return templates.TemplateResponse("about.html",context)


@router.get("/loadlist",response_class=HTMLResponse,status_code=200)
async def load_list(request:Request):
    """Загрузить контакты из файла и вывести их"""
    contact_lst.clear()
    load_contactlist('data\ContaktList.csv')
    result = contact_lst
    context = {"request":request,
               "contactlist":result}
    return templates.TemplateResponse("contactlist.html",context)

@router.get("/list",response_class=HTMLResponse,status_code=200)
async def load_list(request:Request):
    """Список контактов"""
    result = contact_lst
    context = {"request":request,
               "contactlist":result}
    return templates.TemplateResponse("contactlist.html",context)

@router.post("/list", response_model=ContactInfo, status_code=201)
async def add_list(info: ContactInfo):
    """Добавить новый контакт."""
    new_id = max(map(lambda x: int(x.id), contact_lst ))
    info.id=new_id+1
    contact_lst.append(info)
    return info

@router.get("/find",response_class=HTMLResponse,status_code=200)
async def find_list(fio: str = Query(None, description="Фамилия")):
    """Поиск контакта по фамилии"""
    result =  [contact_info for contact_info in contact_lst if contact_info.fio.find(fio)>-1]
    context = {"request":{},
               "contactlist":result}
    return templates.TemplateResponse("contactlist.html",context)


@router.put("/list/{contact_id}", response_model=ContactInfo, status_code=201)
async def edit_list(contact_id: int, info: ContactInfo):
    """Изменить контакт."""
    if int(contact_id)==0:
        raise HTTPException(status_code=409, detail="Укажите ID контакта")
    for index, contact_info in enumerate(contact_lst):
        if contact_info.id==contact_id:
            indx=index
            break

    if len(info.fio)>0:
        contact_lst[indx].fio = info.fio
    if not (info.phone == '80000000000'):
        contact_lst[indx].phone = info.phone
    if len(info.comment)>0:
        contact_lst[indx].comment = info.comment
    return info

@router.delete("/list/{contact_id}", status_code=201)
async def delete_list(contact_id: int):
    """Удаление контакта."""
    if contact_id==0:
        raise HTTPException(status_code=409, detail="Укажите ID контакта")

    for index, contact_info in enumerate(contact_lst):
        if contact_info.id==contact_id:
            contact_lst.pop(index)
            break

    return  {'message': f'Контакт удален.'}
