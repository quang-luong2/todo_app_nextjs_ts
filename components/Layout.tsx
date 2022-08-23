import React, { useRef, useState } from 'react'
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { addTodo, deleteTodo, updateTodo } from '../redux/todoSlice'
import { useDispatch, useSelector } from 'react-redux'
import Todo from '../typescript/model'
import { RootState } from '../redux/configureStore'

const Layout: React.FC = () => {
  const dispatch = useDispatch()
  const [indexTodo, setIndexTodo] = useState<number>(0)
  const [initialValue, setInitialValue] = useState<Todo>({ name: '' })
  const [isStatus, setIsStatus] = useState<boolean>(false)
  const todos = useSelector<RootState, Todo[]>((state) => state.todos)

  const handleSubmit = (value: Todo, action: FormikHelpers<Todo>) => {
    if (isStatus) {
      dispatch(
        updateTodo({
          index: indexTodo,
          name: value,
        })
      )
      setIsStatus(false)
      action.resetForm()
      setInitialValue({ name: '' })
    } else {
      dispatch(addTodo(value))
      action.resetForm()
    }
  }

  const handleUpdateTodo = (index: number) => {
    todos
      ? todos.forEach((todo: Todo, indexTodo: number) => {
          if (index === indexTodo) {
            setIsStatus(true)
            setInitialValue(todo)
            setIndexTodo(index)
          }
        })
      : null
  }

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={Yup.object({
        name: Yup.string().required('Vui lòng nhập tên công việc !'),
      })}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <div className='todo'>
          <h3 className='todo__title'>Todo App</h3>
          <div className='todo__group'>
            <Form>
              <div className='todo__form'>
                <Field
                  type='text'
                  placeholder='Nhập tên công việc'
                  name='name'
                  autoComplete='off'
                  className={`mr-05 ${errors.name && touched.name ? 'todo__input--error' : ''}`}
                />
                <ErrorMessage name='name' component='div' className='form__error' />
              </div>
              <button type='submit' className='todo__btn todo__btn--add'>
                {isStatus ? <i className='fas fa-check'></i> : <i className='fas fa-plus'></i>}
                {isStatus ? 'Cập nhật' : 'Thêm'}
              </button>
            </Form>
          </div>
          <div className='todo__list'>
            {todos.length === 0 ? (
              <div className='todo__notification'>Chưa có công việc nào !</div>
            ) : (
              todos.map((todo: any, index: number) => {
                return (
                  <div className='todo__item' key={index}>
                    <input type='checkbox' />
                    <div className='todo__item__name'>{todo.name}</div>
                    <div className='todo__actions'>
                      <div
                        className='todo__btn todo__btn--update mr-05'
                        onClick={() => handleUpdateTodo(index)}
                      >
                        <i className='fas fa-pen'></i>
                        Sửa
                      </div>
                      <div
                        className='todo__btn todo__btn--delete'
                        onClick={() => dispatch(deleteTodo(index))}
                      >
                        <i className='fas fa-trash-alt'></i>
                        Xóa
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </Formik>
  )
}

export default Layout
