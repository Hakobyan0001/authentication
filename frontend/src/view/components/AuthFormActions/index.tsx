import { Grid, Typography, Link } from '@mui/material';
import StyledComponents from '../../Styles';

type AuthFormActionsProps = {
  loading: boolean;
  error: string | null;
  formLinks?: { href: string; text: string }[];
};

const { StyledButton } = StyledComponents;

export default function AuthFormActions({ loading, error, formLinks }: AuthFormActionsProps) {
  return (
    <>
      <StyledButton type="submit" fullWidth variant="contained">
        {loading ? 'Processing...' : 'Submit'}
      </StyledButton>
      {error && (
        <Typography color="error" variant="body2" align="center">
          {error}
        </Typography>
      )}
      <Grid container justifyContent="space-between">
        {formLinks?.map((link, index) => {
          return (
            <Grid item key={index} >
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
