import { Box, Text, Button } from '@skynexui/components';
import { useRouter } from 'next/router';
import nookies from 'nookies';


export default function LoggedScreen() {
  const router = useRouter();
  return (
    <Box
      styleSheet={{
        border: '1px solid #F9703E',
        flexDirection: 'column',
        maxWidth: '400px',
        marginTop: '20%',
        marginHorizontal: 'auto',
        padding: '32px',
        borderRadius: '4px',
        boxShadow: '1px 1px 5px 0 rgba(255,69,0,0.2)',
      }}
    >
      <Text styleSheet={{ marginVertical: '32px' }}>
        Você acessou uma área protegida!
      </Text>

      <Button
        label='Logout'
        onClick={() => {
          router.push('/')
          nookies.destroy(null, 'SENHA_SECRETA');
        }}
        colorVariant='neutral'
        variant='secondary'
      />
    </Box>
  );
}


export function getStaticProps(ctx) {
  const SENHA_MESTRE = '123456';
  const cookies = nookies.get(ctx);

  // Cookies NÃO existem em build time
  console.log('[static] Cookies', cookies);
  
  
  return {
    props: {},
  }
}
