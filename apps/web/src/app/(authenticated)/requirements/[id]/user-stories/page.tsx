'use client';

import { useEffect, useState, Fragment } from 'react';
import { Button, Col, Row, Typography, message, Collapse } from 'antd';
import { CopyOutlined, SendOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const { Title, Text } = Typography;
import { useAuthentication } from '@web/modules/authentication';
import { useSnackbar } from 'notistack';
import { useRouter, useParams } from 'next/navigation';
import { Api } from '@web/domain';
import { PageLayout } from '@web/layouts/Page.layout';

export default function UserStoryGenerationPage() {
  const router = useRouter();
  const params = useParams<any>();
  const authentication = useAuthentication();
  const userId = authentication?.user?.id;
  const { enqueueSnackbar } = useSnackbar();
  const [userStories, setUserStories] = useState<MyData | null>(null);

  interface MyData {
    id: string;
    title: string;
    description: string;
    userId: string;
    dateCreated: string;
    dateUpdated: string;
    dateDeleted: string | null;
  }

  useEffect(() => {
    if (params.id) {
      Api.Requirement.findById(params.id, {
        includes: ['requirement'],
      })
        .then(data => setUserStories(data))
        .catch(error => {
          enqueueSnackbar('Failed to fetch user stories: ' + error.message, {
            variant: 'error',
          });
        });
    }
  }, [params.id]);


  const hasDescription = (data: any): data is { description: string } => {
    return data && typeof data.description === 'string';
  };

  const parseUserStories = (description: string) => {
    const userStoriesArray = [];
    const regex = /(US\d+):\s*(.*?)\s*(?=US\d+:|$)/gs;
    const sectionRegex = /(Acceptance Criteria:|Boundary Conditions:|Test Case[s]*:)([\s\S]*?)(?=Acceptance Criteria:|Boundary Conditions:|Test Case[s]*:|$)/g;

    let match;
    description = description.replace(/\b(START|END)\b/g, '').trim();

    while ((match = regex.exec(description)) !== null) {
      const userStoryText = match[2].trim();
      const sections = { userStory: '', acceptanceCriteria: [], boundaryConditions: '', testCases: [] };
      const userStoryEndIndex = userStoryText.search(/(Acceptance Criteria:|Boundary Conditions:|Test Case[s]*:|AC\d+:)/);

      if (userStoryEndIndex !== -1) {
        sections.userStory = userStoryText.substring(0, userStoryEndIndex).trim();
      } else {
        sections.userStory = userStoryText;
      }

      let sectionMatch;
      while ((sectionMatch = sectionRegex.exec(userStoryText)) !== null) {
        const sectionTitle = sectionMatch[1].trim();
        let sectionContent = sectionMatch[2].trim();

        if (sectionTitle === 'Acceptance Criteria:') {
          const acRegex = /(?:^|\s)(- .*?)(?=\s- |$)/gs;
          let acMatch;
          while ((acMatch = acRegex.exec(sectionContent)) !== null) {
            sections.acceptanceCriteria.push(acMatch[1].trim());
          }
          // If the regex didn't match, assume the entire section is untagged acceptance criteria
          if (sections.acceptanceCriteria.length === 0) {
            sections.acceptanceCriteria = sectionContent.split('\n').map(item => item.trim()).filter(item => item);
          }
        } else if (sectionTitle === 'Boundary Conditions:') {
          sections.boundaryConditions = sectionContent;
        } else if (sectionTitle.startsWith('Test Case')) {
          sections.testCases = sectionContent.split('\n').map(item => item.trim().replace(/^\d+\.\s*/, '')).filter(item => item.replace(/^\d+\.\s*/, ''));
          // Replace the numbers with dashes in test cases
        }
      }

      // Additional regex to capture untagged acceptance criteria lines starting with AC\d+:
      const acRegex = /(AC\d+:.*?)(?=\s+AC\d+:|\s*$)/gs;
      let acMatch;
      while ((acMatch = acRegex.exec(userStoryText)) !== null) {
        sections.acceptanceCriteria.push(acMatch[1].trim());
      }

      // Process the acceptance criteria to add bold for "Given", "When", "Then"
      sections.acceptanceCriteria = sections.acceptanceCriteria.map(ac => {
        return ac
          .replace(/AC\d+:\s*/, '') // Remove "AC1:", "AC2:", etc.
          .replace(/\b(Given|When|Then)\b/g, '<strong>$1</strong>'); // Bold for "Given", "When", "Then"
      });

      userStoriesArray.push(sections);
    }
    return userStoriesArray;
  };

  const userStoriesArray = hasDescription(userStories) ? parseUserStories(userStories.description) : [];

  const stripHtmlTags = (text: string) => {
    return (text || '').replace(/<[^>]*>/g, '');
  };

  const handleCopyToClipboard = (story: any) => {
    const userStory = story.userStory ? `User Story:\n${stripHtmlTags(story.userStory)}` : '';
    const acceptanceCriteria = (story.acceptanceCriteria && story.acceptanceCriteria.length > 0)
      ? `\n\nAcceptance Criteria:\n${story.acceptanceCriteria.map(stripHtmlTags).join('\n')}`
      : '';
    const boundaryConditions = story.boundaryConditions
      ? `\n\nBoundary Conditions:\n${stripHtmlTags(story.boundaryConditions)}`
      : '';
    const testCases = (story.testCases && story.testCases.length > 0)
      ? `\n\nTest Cases:\n${story.testCases.join('\n')}`
      : '';

    const text = `${userStory}${acceptanceCriteria}${boundaryConditions}${testCases}`.trim();

    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        message.success('Copied to clipboard');
      }).catch(err => {
        message.error('Failed to copy text: ' + err);
      });
    } else {
      message.warning('Nothing to copy');
    }
  };



  const handleSendToJira = (text: string) => {
    // Implement logic to send to Jira
    message.success('Sent to Jira');
  };

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>{userStories?.title}</Title>
          <Text type="secondary">
            Here you can find user stories generated based on {userStories?.givenDescription}.
          </Text>
          <Collapse style={{ width: '100%', margin: 5 }}>
            {userStoriesArray.length > 0 ? (
              userStoriesArray.map((story, index) => (
                <Collapse.Panel header={`User Story ${index + 1}`} key={index}>
                  <div><strong>User Story:</strong> {story.userStory}</div>
                  <div style={{ marginTop: '10px', marginRight: '10px' }}>
                    <strong>Acceptance Criteria:</strong>
                    {story.acceptanceCriteria.length > 0 ? (
                      story.acceptanceCriteria.map((criteria, criteriaIndex) => (
                        <div key={criteriaIndex} style={{ marginTop: '5px' }}>
                          {criteria.split('\n').map((line, lineIndex) => (
                            <div key={lineIndex} dangerouslySetInnerHTML={{ __html: line }} />
                          ))}
                        </div>
                      ))
                    ) : (
                      <Text type="secondary"> No acceptance criteria provided.</Text>
                    )}
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <strong>Boundary Conditions:</strong>
                    {story.boundaryConditions ? (
                      story.boundaryConditions.split('- ').map((condition, conditionIndex) => (
                        condition.trim() && (
                          <Fragment key={conditionIndex}>
                            <div>- {condition.trim()}</div>
                          </Fragment>
                        )
                      ))
                    ) : (
                      <Text type="secondary">No boundary conditions provided.</Text>
                    )}
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <strong>Test Cases:</strong>
                    {story.testCases.length > 0 ? (
                      story.testCases.map((testCase, testCaseIndex) => (
                        <div key={testCaseIndex} style={{ marginTop: '5px' }}>
                          {testCase}
                        </div>
                      ))
                    ) : (
                      <Text type="secondary">No test cases provided.</Text>
                    )}
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <CopyToClipboard
                      text="" // Empty text to disable default CopyToClipboard behavior
                      onCopy={() => handleCopyToClipboard(story)}
                    >
                      <Button icon={<CopyOutlined />}>
                        Copy to Clipboard
                      </Button>
                    </CopyToClipboard>

                    <Button icon={<SendOutlined />} style={{ marginLeft: '10px' }} onClick={() => handleSendToJira(`User Story:\n${story.userStory}\n\nAcceptance Criteria:\n${story.acceptanceCriteria.join('\n')}\n\nBoundary Conditions:\n${story.boundaryConditions}\n\nTest Cases:\n${story.testCases.join('\n')}`)}>
                      Send to Jira
                    </Button>
                  </div>
                </Collapse.Panel>
              ))
            ) : (
              <Text type="secondary">No user stories available.</Text>
            )}
          </Collapse>
        </Col>
      </Row>
    </PageLayout>
  );

}
