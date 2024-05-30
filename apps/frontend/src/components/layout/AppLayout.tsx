import { AppShell, Group, NavLink } from '@mantine/core';
import type React from 'react';

export const AppLayout = ({app}: {app: React.ReactElement}): React.ReactElement => {
  return (  <AppShell
  header={{ height: 60 }}
  padding="md"
  >
  <AppShell.Header>
    <Group h="100%">
    <NavLink href="signup" label="Signup"/>
    </Group>
  </AppShell.Header>
  <AppShell.Main>
    {app}
    </AppShell.Main>
  </AppShell>
)}