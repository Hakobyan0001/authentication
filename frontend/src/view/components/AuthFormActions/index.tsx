import { Grid, Link } from '@mui/material';

import StyledComponents from '../../Styles';

interface AuthFormActionsProps {
  loading: boolean;
  formLinks?: { href: string; text: string }[];
}

const { StyledButton } = StyledComponents;

export default function AuthFormActions({ loading, formLinks }: AuthFormActionsProps) {
  return (
    <>
      <StyledButton type="submit" fullWidth variant="contained">
        {loading ? 'Processing...' : 'Submit'}
      </StyledButton>
      <Grid container justifyContent="space-between">
        {formLinks?.map((link, index) => {
          return (
            <Grid item key={index}>
              <Link href={link.href} variant="body2">
                {link.text}
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
