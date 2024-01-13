# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# SYSTEM DE NOTIFICATION

- a chaque fois qu'on drag and drop

# System de drag and drop dans une meme column entre les task

# System de drag and drop d'une task entre differentes column

# quand drag and drop on doit detecter dans quel section on a mis la card

- TEST
- verifier bug qui montre le login

'''js
<DragDropContext onDragEnd={onDragEnd}>
<Droppable droppableId="board" direction="horizontal" type="column">
{(provided) => (
<Main ref={provided.innerRef} {...provided.droppableProps}>
<Draggable draggableId="todo" index={0}>
{(provided) => (
<>
{/_ {col} _/}
<Column
ref={provided.innerRef}
{...provided.draggableProps}
{...provided.dragHandleProps} >
<ColumnHeader>
<Title2>{t('todo')}</Title2>
<TaskAmount>{todoTask?.length || 0}</TaskAmount>
</ColumnHeader>

                      <Droppable droppableId="todos" type="task">
                        {(provided) => (
                          <TaskContainer
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {todos}
                            {provided.placeholder}
                          </TaskContainer>
                        )}
                      </Droppable>
                      <Modal>
                        <Modal.Open opens="new-task">
                          <AddTaskButton>
                            <Add src={add} alt="add task" />
                          </AddTaskButton>
                        </Modal.Open>
                        <Modal.Window name="new-task">
                          <AddNewTask columnName="todo"></AddNewTask>
                        </Modal.Window>
                      </Modal>
                    </Column>
                  </>
                )}
              </Draggable>
              <Draggable draggableId="progress" index={1}>
                {(provided) => (
                  <Column
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ColumnHeader>
                      <Title2>{t('progress')}</Title2>
                      <TaskAmount>{inprogressTask?.length || 0}</TaskAmount>
                    </ColumnHeader>
                    <Droppable droppableId="progress" type="task">
                      {(provided) => (
                        <TaskContainer
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {progress}
                          {provided.placeholder}
                        </TaskContainer>
                      )}
                    </Droppable>
                    <Modal>
                      <Modal.Open opens="new-task">
                        <AddTaskButton>
                          <Add src={add} alt="add task" />
                        </AddTaskButton>
                      </Modal.Open>
                      <Modal.Window name="new-task">
                        <AddNewTask columnName="progress"></AddNewTask>
                      </Modal.Window>
                    </Modal>
                  </Column>
                )}
              </Draggable>
              <Draggable draggableId="done" index={2}>
                {(provided) => (
                  <Column
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ColumnHeader>
                      <Title2>{t('done')}</Title2>
                      <TaskAmount>{doneTask?.length || 0}</TaskAmount>
                    </ColumnHeader>
                    <Droppable droppableId="done" type="task">
                      {(provided) => (
                        <TaskContainer
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {done}
                          {provided.placeholder}
                        </TaskContainer>
                      )}
                    </Droppable>
                    <Modal>
                      <Modal.Open opens="new-task">
                        <AddTaskButton>
                          <Add src={add} alt="add task" />
                        </AddTaskButton>
                      </Modal.Open>
                      <Modal.Window name="new-task">
                        <AddNewTask columnName="done"></AddNewTask>
                      </Modal.Window>
                    </Modal>
                  </Column>
                )}
              </Draggable>
              {provided.placeholder}
            </Main>
          )}
        </Droppable>
      </DragDropContext>
      <NavLink to="/boards">
        <BackButton>
          <BackImg src={Back} alt="back to boards" />
          <Span>{t('backToBoards')}</Span>
        </BackButton>
      </NavLink>
    </>

'''
