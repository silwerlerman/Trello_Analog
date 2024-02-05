import { Paths } from '@UI/Paths';
import { Task as TaskType } from '@Core/Task';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Button,
  Group,
  MiniInfoCell,
  Spacing,
  Text,
  Title
} from '@vkontakte/vkui';
import { Icon28EditOutline, Icon28More } from '@vkontakte/icons';
import { useGoToPath } from '@API/LocalHooks/useGoToPath';

export const Task = (props: TaskType) => {
  const task = props;
  const { goToPath } = useGoToPath(task);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: task.id, data: { type: 'Task', task } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col py-3 px-3 border-2 rounded-lg drop-shadow main-background"
    >
      <Group mode="plain" className="flex justify-between">
        <Button
          appearance="neutral"
          size="s"
          mode="link"
          onClick={e => goToPath(e, Paths.Preview)}
          className="mb-2"
        >
          <Title level="3">{task.name}</Title>
        </Button>
        <Icon28More width={24} height={24} />
      </Group>
      <Spacing size={12} />
      <Text>{task.description}</Text>
      <Spacing size={12} />
      <Group mode="plain" className="flex justify-between">
        <Button
          before={<Icon28EditOutline width={24} height={24} />}
          mode="link"
          onClick={e => goToPath(e, Paths.Edit)}
        ></Button>
        <MiniInfoCell className="pr-0-important" mode="accent">
          {task.created_at.toLocaleDateString()}
        </MiniInfoCell>
      </Group>
    </div>
  );
};
