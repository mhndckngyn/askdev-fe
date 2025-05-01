import PageLoader from '@/components/PageLoader';
import { useActionStore } from '@/stores/useActionModalStore';
import { useErrorStore } from '@/stores/useErrorStore';
import { ApiResponse } from '@/types';
import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import styles from './EmailVerify.module.css';
import Expired from './partials/Expired';
import Invalid from './partials/Invalid';
import Success from './partials/Success';
import { submitResendVerification, submitVerificationToken } from './services';

type TokenState = 'LOADING' | 'SUCCESS' | 'EXPIRED' | 'INVALID';

export default function EmailVerify() {
  const { t } = useTranslation('emailVerify');
  const { t: tCommon } = useTranslation('common');

  const setAction = useActionStore((state) => state.setAction);
  const setError = useErrorStore((state) => state.setError);

  const [state, setState] = useState<TokenState>('LOADING');
  const [resendEmail, setResendEmail] = useState('');
  const [isResending, setResending] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setState('INVALID');
      return;
    }

    const handleSubmitToken = async () => {
      const response: ApiResponse = await submitVerificationToken(token);

      if (response.success) {
        setState('SUCCESS');
        return;
      }

      if (response.statusCode === 410) {
        setState('EXPIRED');
        // thử đọc email từ response, nếu có thì cho người dùng lựa chọn để gửi lại
        const email = response.content.email;
        if (email) {
          setResendEmail(email);
        }
      } else {
        setState('INVALID');
      }
    };

    handleSubmitToken();
  }, []);

  const handleResend = async () => {
    setResending(true);

    const response: ApiResponse = await submitResendVerification(resendEmail);

    if (response.success) {
      setAction(t('resend-successful'), tCommon('ok'));
    } else {
      setError(t('resend-failed'));
    }
    setResending(false);
  };

  if (state === 'LOADING') return <PageLoader />;

  return (
    <Container size="sm" className={styles.container}>
      {state === 'SUCCESS' && <Success />}
      {state === 'INVALID' && <Invalid />}
      {state === 'EXPIRED' && (
        <Expired
          email={resendEmail}
          onResend={handleResend}
          isResending={isResending}
        />
      )}
    </Container>
  );
}
