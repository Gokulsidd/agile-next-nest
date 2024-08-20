'use client'

import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import { Api } from '@web/domain';

const { Title } = Typography;

export default function IntegrationPage() {
  const [jiraApiKey, setJiraApiKey] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJiraApiKey(event.target.value);
  };

  const saveJiraApiKey = async () => {
    try {
      const user = await Api.User.findMe();
      await Api.User.update(user.id, { ...user, jiraApiKey });
      alert('JIRA API Key saved successfully!');
    } catch (error) {
      console.error('Failed to save JIRA API Key:', error);
      alert('Failed to save JIRA API Key');
    }
  };

  return (
    <div>
      <Title>Integration Page</Title>
      <Input
        placeholder="Enter JIRA API Key"
        value={jiraApiKey}
        onChange={handleInputChange}
      />
      <Button type="primary" onClick={saveJiraApiKey}>
        Save JIRA API Key
      </Button>
    </div>
  );
}
