import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702311247028 implements MigrationInterface {
  name = 'Script1702311247028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `
        INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('30b66e4c-f77c-4066-a9c8-e1949480fba4', '7Rylee_Klein53@gmail.com', 'Carol White', 'https://i.imgur.com/YfJQV5z.png?id=9', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('681a13a2-0581-4b01-be09-490ee770e3bf', '13Abigail23@gmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=15', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('9a996c8a-86b5-46bd-a8c3-fb6cffea5ac0', '19Cristina21@yahoo.com', 'Carol White', 'https://i.imgur.com/YfJQV5z.png?id=21', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('abc74226-6561-44d9-907b-27dacbfb0909', '25Dixie.OConner-Hermann@gmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=27', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('4e8fc2ac-7aae-4f27-8acd-e1b69c87446c', '31Abagail49@gmail.com', 'Carol White', 'https://i.imgur.com/YfJQV5z.png?id=33', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('76b18fe3-e30d-4346-af12-775861e378e9', '37Quinton_Bernier7@yahoo.com', 'Bob Smith', 'https://i.imgur.com/YfJQV5z.png?id=39', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('bc1cdcb2-c928-4b4e-8abb-44ac4335e0e2', '43Glenda25@yahoo.com', 'Bob Smith', 'https://i.imgur.com/YfJQV5z.png?id=45', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('7a99d99b-555c-4ce2-9bf8-1cb1918f1675', '49Maxie_Grady47@gmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('16f5aa80-308a-4382-87ad-ee14cf04a58e', '55Leanna_Jenkins69@yahoo.com', 'Eva Green', 'https://i.imgur.com/YfJQV5z.png?id=57', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('74b9a208-1ae9-4f07-935e-014c5ca4e10d', 'Reminder Project Deadline', 'Your user stories have been successfully submitted and will be reviewed shortly.', 'HR Department', '64Schuyler_Hegmann45@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=65', 'https://i.imgur.com/YfJQV5z.png?id=66', '4e8fc2ac-7aae-4f27-8acd-e1b69c87446c');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('699ab394-4d2f-4856-83a0-8ad2b4f1cf2d', 'New Feature Update', 'Just a reminder that the project deadline is next Friday.', 'Project Manager', '71Sigurd.Littel59@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=72', 'https://i.imgur.com/YfJQV5z.png?id=73', '7a99d99b-555c-4ce2-9bf8-1cb1918f1675');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('50342fc5-f60c-4f75-bb1e-192540e91c54', 'System Maintenance Scheduled', 'Scheduled maintenance will occur this Saturday from 2 AM to 4 AM.', 'Project Manager', '78Sydnie95@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=79', 'https://i.imgur.com/YfJQV5z.png?id=80', '9a996c8a-86b5-46bd-a8c3-fb6cffea5ac0');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('f95c3baf-9e20-48c2-b19c-65c4c9a14b0c', 'System Maintenance Scheduled', 'We are thrilled to have you onboard and cant wait to get started', 'System Admin', '85Enrique.Kovacek@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=86', 'https://i.imgur.com/YfJQV5z.png?id=87', '4e8fc2ac-7aae-4f27-8acd-e1b69c87446c');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('38f6d35b-d593-4658-8b0b-9da46b5697e2', 'Welcome to the Team', 'Just a reminder that the project deadline is next Friday.', 'System Admin', '92Myrl.Lubowitz@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=93', 'https://i.imgur.com/YfJQV5z.png?id=94', '30b66e4c-f77c-4066-a9c8-e1949480fba4');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('a0f7eb38-0e1a-4218-ab27-77644aeb82db', 'User Story Submission Success', 'Your user stories have been successfully submitted and will be reviewed shortly.', 'Alice Johnson', '99Lenora22@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=100', 'https://i.imgur.com/YfJQV5z.png?id=101', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('4bee21b5-10c8-446d-baac-e5e388cfa21b', 'New Feature Update', 'Your user stories have been successfully submitted and will be reviewed shortly.', 'Agile Bot', '106Kamryn13@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=107', 'https://i.imgur.com/YfJQV5z.png?id=108', '30b66e4c-f77c-4066-a9c8-e1949480fba4');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('840438c0-fd58-41c3-b833-d86c22787241', 'Reminder Project Deadline', 'We are thrilled to have you onboard and cant wait to get started', 'Agile Bot', '113Rollin.Raynor-Stokes@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=114', 'https://i.imgur.com/YfJQV5z.png?id=115', '681a13a2-0581-4b01-be09-490ee770e3bf');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('4c8c8ea0-fc3d-4df3-ac7b-74023fabca57', 'Reminder Project Deadline', 'Scheduled maintenance will occur this Saturday from 2 AM to 4 AM.', 'System Admin', '120Syble.Langworth28@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=121', 'https://i.imgur.com/YfJQV5z.png?id=122', '76b18fe3-e30d-4346-af12-775861e378e9');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('ca4c2c2e-9db2-4cd4-8afc-d2f7175eec62', 'Reminder Project Deadline', 'Scheduled maintenance will occur this Saturday from 2 AM to 4 AM.', 'HR Department', '127Mason.Toy@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=128', 'https://i.imgur.com/YfJQV5z.png?id=129', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "requirement" ("id", "description", "userId") VALUES ('b9f06ba4-e5c9-42d7-b8c1-00baa8020f15', 'Design a scalable database architecture to handle increasing amounts of data.', '4e8fc2ac-7aae-4f27-8acd-e1b69c87446c');
INSERT INTO "requirement" ("id", "description", "userId") VALUES ('d58997d1-71cc-431c-8cb1-7cc45550c1f3', 'Integrate thirdparty API for payment processing to support multiple currencies.', '4e8fc2ac-7aae-4f27-8acd-e1b69c87446c');
INSERT INTO "requirement" ("id", "description", "userId") VALUES ('2a524707-5409-4121-bc36-e4fc3693010f', 'Implement a secure login system with multifactor authentication.', 'abc74226-6561-44d9-907b-27dacbfb0909');
INSERT INTO "requirement" ("id", "description", "userId") VALUES ('607f5edb-e7d4-421f-b08c-12faee520b21', 'Design a scalable database architecture to handle increasing amounts of data.', 'bc1cdcb2-c928-4b4e-8abb-44ac4335e0e2');
INSERT INTO "requirement" ("id", "description", "userId") VALUES ('45943cfd-5e8b-4724-a8bd-bf7dff89190e', 'Implement a secure login system with multifactor authentication.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "requirement" ("id", "description", "userId") VALUES ('96f429b8-2b73-465c-8890-350a69ab031f', 'Develop a responsive user interface compatible with mobile and desktop devices.', '7a99d99b-555c-4ce2-9bf8-1cb1918f1675');
INSERT INTO "requirement" ("id", "description", "userId") VALUES ('0515281b-3414-4e12-8755-34d032514473', 'Create a realtime data analytics dashboard for monitoring sales metrics.', 'abc74226-6561-44d9-907b-27dacbfb0909');
INSERT INTO "requirement" ("id", "description", "userId") VALUES ('411511cb-ba0b-49bf-bcf0-9bd24371544b', 'Integrate thirdparty API for payment processing to support multiple currencies.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "requirement" ("id", "description", "userId") VALUES ('23b5416f-f079-4343-abbb-8e37c94da54a', 'Create a realtime data analytics dashboard for monitoring sales metrics.', '16f5aa80-308a-4382-87ad-ee14cf04a58e');
INSERT INTO "requirement" ("id", "description", "userId") VALUES ('6c6633c9-638b-4701-811d-4e987e5f446a', 'Design a scalable database architecture to handle increasing amounts of data.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "userstory" ("id", "text", "requirementId") VALUES ('636c1b9a-e19a-4a26-92f1-93ab823613eb', 'As a user I can copy the User Stories to use in external platforms like JIRA to streamline my workflow.', '6c6633c9-638b-4701-811d-4e987e5f446a');
INSERT INTO "userstory" ("id", "text", "requirementId") VALUES ('7466031e-1a04-4bf0-b824-f637941c5438', 'As a user I want the application to automatically save my inputted data so that I can retrieve it later if needed.', '2a524707-5409-4121-bc36-e4fc3693010f');
INSERT INTO "userstory" ("id", "text", "requirementId") VALUES ('65af619c-9dac-4c94-8f13-caea26db0f09', 'As a user I can input highlevel requirements in a text area so that I can easily start breaking down my project.', '6c6633c9-638b-4701-811d-4e987e5f446a');
INSERT INTO "userstory" ("id", "text", "requirementId") VALUES ('9eb28df2-6960-4296-b247-7ea2ac0e065a', 'As a user I can view the generated User Stories on the same page to quickly see the results of my inputs.', '0515281b-3414-4e12-8755-34d032514473');
INSERT INTO "userstory" ("id", "text", "requirementId") VALUES ('e431f245-0968-4c3f-bfbb-0df26850e718', 'As a user I can copy the User Stories to use in external platforms like JIRA to streamline my workflow.', '607f5edb-e7d4-421f-b08c-12faee520b21');
INSERT INTO "userstory" ("id", "text", "requirementId") VALUES ('d8b37dcb-cec3-4e6a-8d6f-730c51ac00eb', 'As a user I can copy the User Stories to use in external platforms like JIRA to streamline my workflow.', '0515281b-3414-4e12-8755-34d032514473');
INSERT INTO "userstory" ("id", "text", "requirementId") VALUES ('cb342a7d-b800-4d7d-b825-7acc8c55b46e', 'As a user I can input highlevel requirements in a text area so that I can easily start breaking down my project.', 'b9f06ba4-e5c9-42d7-b8c1-00baa8020f15');
INSERT INTO "userstory" ("id", "text", "requirementId") VALUES ('e9c26992-935f-40db-9cc2-d46fffdc1a76', 'As a user I can browse through my last 5 requests and responses in a History section to track changes and updates.', 'b9f06ba4-e5c9-42d7-b8c1-00baa8020f15');
INSERT INTO "userstory" ("id", "text", "requirementId") VALUES ('459b901b-72ea-42bc-8e59-4eeb56fe575a', 'As a user I want the application to automatically save my inputted data so that I can retrieve it later if needed.', '411511cb-ba0b-49bf-bcf0-9bd24371544b');
INSERT INTO "userstory" ("id", "text", "requirementId") VALUES ('b02ff9a6-c0f5-4e07-b5bc-0b8b5e41fccc', 'As a user I want the application to automatically save my inputted data so that I can retrieve it later if needed.', 'd58997d1-71cc-431c-8cb1-7cc45550c1f3');

INSERT INTO "history" ("id", "userId") VALUES ('9a8642af-d7ce-4f5f-8c2a-84b41a3cf708', '9a996c8a-86b5-46bd-a8c3-fb6cffea5ac0');
INSERT INTO "history" ("id", "userId") VALUES ('61f3c4af-3fcd-4fb9-8b7b-016abb9f28f9', '9a996c8a-86b5-46bd-a8c3-fb6cffea5ac0');
INSERT INTO "history" ("id", "userId") VALUES ('4795fc23-75f4-47f6-93c5-2dcdc4199f7b', '9a996c8a-86b5-46bd-a8c3-fb6cffea5ac0');
INSERT INTO "history" ("id", "userId") VALUES ('0ebbd3c4-b3b8-4458-9723-8dc0b27ba31b', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "history" ("id", "userId") VALUES ('7c2bb8af-a46b-458e-8212-d21f87de6424', '681a13a2-0581-4b01-be09-490ee770e3bf');
INSERT INTO "history" ("id", "userId") VALUES ('bcc92fd3-41d6-47ba-bd6c-53bf6783e211', 'abc74226-6561-44d9-907b-27dacbfb0909');
INSERT INTO "history" ("id", "userId") VALUES ('8c9af86d-460f-495a-9304-c482528b73f9', 'abc74226-6561-44d9-907b-27dacbfb0909');
INSERT INTO "history" ("id", "userId") VALUES ('a547d3dd-8c4b-4ed7-b32d-1022c336ca33', '7a99d99b-555c-4ce2-9bf8-1cb1918f1675');
INSERT INTO "history" ("id", "userId") VALUES ('5dcee447-e674-44af-8a51-a2bec3bbe9ea', 'bc1cdcb2-c928-4b4e-8abb-44ac4335e0e2');
INSERT INTO "history" ("id", "userId") VALUES ('590c5fac-d1b9-41a2-a200-75b012007ca9', '76b18fe3-e30d-4346-af12-775861e378e9');

INSERT INTO "historyentry" ("id", "timestamp", "historyId", "requirementId") VALUES ('8ab38b01-ee5d-4659-892d-ab6e0781a3b6', '2023-05-26T20:10:16.918Z', '590c5fac-d1b9-41a2-a200-75b012007ca9', 'd58997d1-71cc-431c-8cb1-7cc45550c1f3');
INSERT INTO "historyentry" ("id", "timestamp", "historyId", "requirementId") VALUES ('a8a901d5-48d5-4853-9d1a-6934028ebbc7', '2024-03-11T19:31:48.589Z', '5dcee447-e674-44af-8a51-a2bec3bbe9ea', '2a524707-5409-4121-bc36-e4fc3693010f');
INSERT INTO "historyentry" ("id", "timestamp", "historyId", "requirementId") VALUES ('f3867a35-3792-473f-b048-ac156c1d8109', '2025-02-14T12:17:40.963Z', '7c2bb8af-a46b-458e-8212-d21f87de6424', '0515281b-3414-4e12-8755-34d032514473');
INSERT INTO "historyentry" ("id", "timestamp", "historyId", "requirementId") VALUES ('532c371a-ad29-4bb0-bc20-d5bf5178bdd3', '2024-03-21T13:26:22.723Z', '61f3c4af-3fcd-4fb9-8b7b-016abb9f28f9', '0515281b-3414-4e12-8755-34d032514473');
INSERT INTO "historyentry" ("id", "timestamp", "historyId", "requirementId") VALUES ('6a5e50ba-47c5-473b-9338-0cac54837cee', '2023-09-16T13:33:50.086Z', 'a547d3dd-8c4b-4ed7-b32d-1022c336ca33', 'b9f06ba4-e5c9-42d7-b8c1-00baa8020f15');
INSERT INTO "historyentry" ("id", "timestamp", "historyId", "requirementId") VALUES ('4be852fd-6492-4cda-b31f-0d4a31a41423', '2024-07-27T08:00:55.424Z', 'bcc92fd3-41d6-47ba-bd6c-53bf6783e211', '411511cb-ba0b-49bf-bcf0-9bd24371544b');
INSERT INTO "historyentry" ("id", "timestamp", "historyId", "requirementId") VALUES ('6798682d-a7e2-4601-adde-db71c1902bd2', '2025-03-20T00:35:27.405Z', '4795fc23-75f4-47f6-93c5-2dcdc4199f7b', '411511cb-ba0b-49bf-bcf0-9bd24371544b');
INSERT INTO "historyentry" ("id", "timestamp", "historyId", "requirementId") VALUES ('ec259765-1438-4b92-8190-5a6f097c74c8', '2024-12-04T21:02:45.876Z', 'a547d3dd-8c4b-4ed7-b32d-1022c336ca33', '0515281b-3414-4e12-8755-34d032514473');
INSERT INTO "historyentry" ("id", "timestamp", "historyId", "requirementId") VALUES ('bb00ef87-f4d9-4a7b-866b-2de5c59acc97', '2025-01-26T19:10:34.527Z', '61f3c4af-3fcd-4fb9-8b7b-016abb9f28f9', '2a524707-5409-4121-bc36-e4fc3693010f');
INSERT INTO "historyentry" ("id", "timestamp", "historyId", "requirementId") VALUES ('0be13a7c-fb50-4d29-9c61-768c07d4830f', '2024-01-27T05:54:02.665Z', '9a8642af-d7ce-4f5f-8c2a-84b41a3cf708', 'b9f06ba4-e5c9-42d7-b8c1-00baa8020f15');
    `,
      )
    } catch (error) {
      // ignore
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
