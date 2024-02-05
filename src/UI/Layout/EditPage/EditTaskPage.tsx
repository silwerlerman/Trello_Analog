import { useEditTask } from './useEditTask';
import { useNavigationBack } from '@API/LocalHooks';
import { stages } from '@Core/Metadata';
import {
  Button,
  FormItem,
  Input,
  Panel,
  Header,
  Select,
  Textarea,
  Footer,
  View,
  Group,
  Spacing,
  PanelSpinner
} from '@vkontakte/vkui';
import { Controller } from 'react-hook-form';

export const EditTaskPage = () => {
  const { goBack } = useNavigationBack();
  const {
    id,
    data,
    isLoading,
    dataUpdatedAt,
    isSubmitting,
    handleSubmit,
    submitHandler,
    getDefaultValue,
    control,
    errors
  } = useEditTask();

  return (
    !isLoading && (
      <View activePanel="main" className="h-fit-content-important">
        {
          <Panel
            id="main"
            className="flex flex-col custom-box backdrop:bg-black backdrop:opacity-75 max-w-3xl mx-auto h-full h-fit-content-important"
          >
            <Header className="flex justify-between px-4 py-4" size="large">
              {id
                ? 'Форма редактирования задачи'
                : 'Форма создания новой задачи'}
            </Header>
            <Spacing size={16} />
            {isSubmitting || isLoading ? (
              <PanelSpinner size="medium" />
            ) : (
              <Group className="mx-4">
                <form
                  id="form"
                  key={dataUpdatedAt}
                  className="flex flex-col overflow-auto"
                >
                  <Controller
                    name="id"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <FormItem
                        htmlFor="id"
                        top="ID"
                        bottom={errors?.id?.message ? errors?.id?.message : ''}
                        status={
                          errors?.id?.message?.length ? 'error' : 'default'
                        }
                      >
                        <Input
                          id="id"
                          type="number"
                          min={0}
                          max={100}
                          disabled={!!id}
                          placeholder="Введите ID..."
                          defaultValue={data?.id}
                          onChange={onChange}
                        />
                      </FormItem>
                    )}
                  />
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <FormItem
                        htmlFor="name"
                        top="Название"
                        bottom={
                          errors?.name?.message ? errors?.name?.message : ''
                        }
                        status={
                          errors?.name?.message?.length ? 'error' : 'default'
                        }
                      >
                        <Input
                          id="name"
                          placeholder="Введите название..."
                          defaultValue={data?.name}
                          onChange={onChange}
                        />
                      </FormItem>
                    )}
                  />
                  <Controller
                    name="stage"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <FormItem
                        htmlFor="stage"
                        top="Этап"
                        bottom={
                          errors?.stage?.message ? errors?.stage?.message : ''
                        }
                        status={
                          errors?.stage?.message?.length ? 'error' : 'default'
                        }
                      >
                        <Select
                          id="stage"
                          disabled={!!id}
                          placeholder="Выберите этап..."
                          options={stages.map((stage, i) => ({
                            label: stage.name,
                            value: i
                          }))}
                          defaultValue={getDefaultValue()}
                          onChange={onChange}
                        />
                      </FormItem>
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <FormItem
                        htmlFor="description"
                        top="Описание"
                        bottom={
                          errors?.description?.message
                            ? errors?.description?.message
                            : ''
                        }
                        status={
                          errors?.description?.message?.length
                            ? 'error'
                            : 'default'
                        }
                      >
                        <Textarea
                          id="description"
                          placeholder="Введите описание..."
                          defaultValue={data?.description}
                          onChange={onChange}
                        />
                      </FormItem>
                    )}
                  />
                </form>
              </Group>
            )}
            {!isSubmitting && !isLoading && (
              <Footer
                aria-orientation="horizontal"
                className={` flex justify-center gap-6`}
              >
                {!isSubmitting && !isLoading && (
                  <Button
                    size="l"
                    onClick={handleSubmit(submitHandler)}
                    appearance="accent"
                    stretched
                  >
                    {id ? 'Сохранить' : 'Создать'}
                  </Button>
                )}
                {id && !isSubmitting && !isLoading && (
                  <Button size="l" onClick={goBack} mode="tertiary" stretched>
                    {'Отмена'}
                  </Button>
                )}
              </Footer>
            )}
          </Panel>
        }
      </View>
    )
  );
};
