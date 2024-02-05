import { Paths } from '@UI/Paths';
import { generatePath } from 'react-router-dom';
import { usePreviewDialog } from './usePreviewDialog';
import {
  Button,
  ButtonGroup,
  Group,
  InfoRow,
  Panel,
  PanelSpinner,
  PopoutWrapper,
  SimpleCell,
  Title
} from '@vkontakte/vkui';
import { Icon28EditOutline, Icon36Cancel } from '@vkontakte/icons';
import { useGoToPath } from '@API/LocalHooks/useGoToPath';
import { Task } from '@Core/Task';

export const PreviewDialog = ({ title }: { title: string }) => {
  const { id, isLoading, data, goBack } = usePreviewDialog();
  const { goToPath } = useGoToPath(data as Task);

  return (
    <PopoutWrapper>
      <Panel className="p-3 flex-col-important relative rounded-lg max-w-3xl custom-box">
        <Group mode="plain" className="flex justify-between px-4">
          <Title level="2">{title}</Title>
          <ButtonGroup className="flex gap-6">
            <Button
              before={<Icon28EditOutline width={24} height={24} />}
              mode="link"
              onClick={e =>
                goToPath(e, generatePath(Paths.Edit, { id: id || null }))
              }
            ></Button>
            <Button
              before={<Icon36Cancel width={28} height={28} />}
              mode="link"
              onClick={goBack}
            ></Button>
          </ButtonGroup>
        </Group>

        {isLoading ? (
          <PanelSpinner size="medium" />
        ) : (
          <Group className="px-4">
            <SimpleCell>
              <InfoRow header="Название">{data?.name}</InfoRow>
            </SimpleCell>
            <SimpleCell>
              <InfoRow header="Описание">{data?.description}</InfoRow>
            </SimpleCell>
            <SimpleCell>
              <InfoRow header="Дата создания">
                {data?.created_at.toLocaleDateString()}
              </InfoRow>
            </SimpleCell>
          </Group>
        )}
      </Panel>
    </PopoutWrapper>
  );
};
