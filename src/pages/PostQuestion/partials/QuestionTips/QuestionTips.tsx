import { Accordion, Stack, Title, List } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import styles from './QuestionTips.module.css';

export default function QuestionTips() {
  const { t } = useTranslation();

  const questions = t('questionTips.items', { returnObjects: true });

  return (
    <Stack component="aside" className={styles.aside}>
      <div className={styles.sticky}>
        <Title order={2} className={styles.title}>
          {t('questionTips.title')}
        </Title>
        <Accordion variant="contained">
          {Object.entries(questions).map(([key, item]) => (
            <Accordion.Item key={key} value={key}>
              <Accordion.Control>{item.question}</Accordion.Control>
              <Accordion.Panel>
                <List>
                  {item.answers.map((answer: string, index: number) => (
                    <List.Item key={index}>{answer}</List.Item>
                  ))}
                </List>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </Stack>
  );
}
