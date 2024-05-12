import { Form } from "entities/Form/Form"
import { listItemThemes } from "entities/ListItem/ListItem"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuthority } from "shared/config/store/actionCreators/authActions"
import { createCategory } from "shared/config/store/actionCreators/categoryActions"
import { getAllRequests, updateRequest } from "shared/config/store/actionCreators/requestActions"
import { selectRequests } from "shared/config/store/reducers/RequestSlice"
import { transformDate } from "shared/lib/transformDate"
import { truncate } from "shared/lib/truncate"
import { DataContainer } from "widgets/DataContainer/DataContainer"
import { Modal } from "widgets/Modal"

export default () => {

    const dispatch = useDispatch()

    const [modalValues, setModalValues] = useState(null)

    useEffect(() => {
        dispatch(getAllRequests())
    }, [])

    const buttons = [
        {
            title: 'Обработать',
            action: (itemData, e) => {
                e.preventDefault()
                if (itemData.status === "В обработке") {
                    setModalValues({
                        title: itemData.title,
                        content: itemData.content,
                        request: itemData.id,
                        author: itemData.author
                    })
                }
            }
        },
        {
            title: 'Отклонить',
            action: (itemData, e) => {
                e.preventDefault()
                if (itemData.status === "В обработке") {
                    dispatch(updateRequest(itemData.id, 'Отклонено'))
                }
            }
        }
    ]

    const dataTransformer = (fields) => ({
        "ID заявки": {data: fields.id},
        "Заголовок": {data: fields.title},
        "ID автора": {data: fields.author.id},
        "Содержание": {data: truncate(fields.content, 23)},
        "Статус заявки": {data: fields.status},
        "Дата загрузки": {data: transformDate(new Date(fields.date))}
    })

    return (
        <div>
            {modalValues &&
                <Modal 
                    closer={() => {setModalValues(null)}}
                    header={`Обработка заявки "${modalValues.title}"`}
                >
                    <div>
                        <p><strong>Автор: </strong>{modalValues.author.nickname ?? modalValues.author.email}</p>
                        <p>{modalValues.content}</p>
                    </div>
                    <hr />
                    <Form
                        fields={[
                            { 
                                type: 'text',
                                preset: modalValues.title,
                                upperLabel: 'Заголовок'
                            },
                            { 
                                type: 'text',
                                preset: modalValues.request,
                                disabled: true,
                                upperLabel: 'ID заявки'
                            },
                            { 
                                type: 'text',
                                preset: modalValues.author.id,
                                disabled: true,
                                upperLabel: 'ID автора'                            
                            },
                            {
                                type: 'file',
                                placeholder: 'Картинка'
                            }
                        ]}
                        buttonText={'Создать'}
                        action={(title, request, author, picture) => {
                            dispatch(createCategory(title, picture, author, request))
                            dispatch(updateRequest(modalValues.request, 'Успешно обработано'))
                            setModalValues(null)
                        }}
                    />
                </Modal>
            }
            <DataContainer
                title={"Администрирование заявок"}
                buttons={buttons}
                dataSelector={{ selectorFn: selectRequests, dataKey: "requestsList" }}
                dataTransformer={dataTransformer}
                redundant
                listtheme={listItemThemes.STROKE}
                getTitleField={(itemData) => itemData.title}
            />
        </div>
    )
}