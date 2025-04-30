import { Accordion, Stack, Title, List, Image } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import styles from './QuestionTips.module.css';
import { faq } from '@/assets/images';

export default function QuestionTips() {
  const { t } = useTranslation('postQuestion');

  const questions = t('question-tips.items', { returnObjects: true });

  return (
    <Stack component="aside" className={styles.aside}>
      <div className={styles.sticky}>
        <Title order={2} className={styles.title}>
          {t('question-tips.title')}
        </Title>
        <Image
          src={faq}
          alt="Frequently Asked Questions"
          className={styles.image}
        />
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
