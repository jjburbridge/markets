import {defineMigration, createOrReplace} from 'sanity/migrate'

/**
 * this migration will create 10 documents of type `collection`
 */
export default defineMigration({
  title: 'import',

  async *migrate() {
    const docs = []
    // get data from external source instead of this loop
    for (let i = 0; i < 10; i++) {
      docs.push({
        _id: `doc-${i}`,
        _type: 'collection',
        title: `Document ${i}`,
      })
    }
    yield docs.map((doc) => createOrReplace(doc))
  },
})



// {
//   "result": [
//       {
//           "_createdAt": "2025-12-29T12:08:01Z",
//           "_id": "21cc3d2e-0f56-49ba-b4ab-9287e70abebe",
//           "authorId": "pRKTgdbon",
//           "contentSnapshot": [
//               {
//                   "_key": "2ad623d8035b",
//                   "_type": "block",
//                   "children": [
//                       {
//                           "_key": "a18bc2c322b4",
//                           "_type": "span",
//                           "marks": [],
//                           "text": "Germany"
//                       }
//                   ],
//                   "markDefs": [],
//                   "style": "normal"
//               }
//           ],
//           "context": {
//               "notification": {
//                   "currentThreadLength": 1,
//                   "documentTitle": "Marine Risks (IMRNL)",
//                   "url": "https://axco.sanity.studio/production/intent/edit/id=92b2fa99-a6a9-4730-b292-9f78941fe6da;type=sectionContent;inspect=sanity%2Fcomments;comment=21cc3d2e-0f56-49ba-b4ab-9287e70abebe/",
//                   "workspaceName": "production-workspace",
//                   "workspaceTitle": "Axco Studio (Production)"
//               },
//               "payload": {
//                   "workspace": "production-workspace"
//               },
//               "tool": ""
//           },
//           "lastEditedAt": null,
//           "message": [
//               {
//                   "_key": "c053dd063c31",
//                   "_type": "block",
//                   "children": [
//                       {
//                           "_key": "a978cd713374",
//                           "_type": "span",
//                           "marks": [],
//                           "text": "Test"
//                       }
//                   ],
//                   "markDefs": [],
//                   "style": "normal"
//               }
//           ],
//           "parentCommentId": null,
//           "reactions": [],
//           "status": "open",
//           "target": {
//               "document": {
//                   "_dataset": "production",
//                   "_projectId": "fokp4bp1",
//                   "_ref": "92b2fa99-a6a9-4730-b292-9f78941fe6da",
//                   "_type": "crossDatasetReference",
//                   "_weak": true
//               },
//               "documentRevisionId": "bacfc391-0625-4e2c-bf74-22de7dcc0c2f",
//               "documentType": "sectionContent",
//               "path": {
//                   "field": "content",
//                   "selection": {
//                       "type": "text",
//                       "value": [
//                           {
//                               "_key": "2ad623d8035b",
//                               "text": "Verein Hanseatische Transportversicherung is an independent claims service provider for the maritime and transport industry in Germany."
//                           }
//                       ]
//                   }
//               }
//           },
//           "threadId": "b1812998-59c5-4b9c-875f-15d8d1446caf"
//       },
//       {
//           "_createdAt": "2025-12-29T11:34:06Z",
//           "_id": "6dd4f57f-1edd-42f1-844e-d94975f12866",
//           "authorId": "p5LywPnGe",
//           "contentSnapshot": null,
//           "context": {
//               "notification": {
//                   "currentThreadLength": 2,
//                   "documentTitle": "Marine Risks (IMRNL)",
//                   "url": "https://axco.sanity.studio/production/intent/edit/id=92b2fa99-a6a9-4730-b292-9f78941fe6da;type=sectionContent;inspect=sanity%2Fcomments;comment=6dd4f57f-1edd-42f1-844e-d94975f12866/",
//                   "workspaceName": "production-workspace",
//                   "workspaceTitle": "Axco Studio (Production)"
//               },
//               "payload": {
//                   "workspace": "production-workspace"
//               },
//               "tool": ""
//           },
//           "lastEditedAt": null,
//           "message": [
//               {
//                   "_key": "0a4ea1b6e2f5",
//                   "_type": "block",
//                   "children": [
//                       {
//                           "_key": "f3e70456074a",
//                           "_type": "span",
//                           "marks": [],
//                           "text": "Hi Clifford. Thanks for reviewing. I will try to resolve the discrepancy between sources (clearly the UNCTAD data are authoritative, as are those of the Federal Maritime Authority). The confusion probably has to do with the \"flagging\" of vessels. I will amend this as a last task before sending to Production and notify you accordingly.@"
//                       }
//                   ],
//                   "markDefs": [],
//                   "style": "normal"
//               }
//           ],
//           "parentCommentId": "a5d5c4f5-b044-4c47-8194-e0330d473080",
//           "reactions": [],
//           "status": "open",
//           "target": {
//               "document": {
//                   "_dataset": "production",
//                   "_projectId": "fokp4bp1",
//                   "_ref": "92b2fa99-a6a9-4730-b292-9f78941fe6da",
//                   "_type": "crossDatasetReference",
//                   "_weak": true
//               },
//               "documentRevisionId": "bacfc391-0625-4e2c-bf74-22de7dcc0c2f",
//               "documentType": "sectionContent",
//               "path": {
//                   "field": "content"
//               }
//           },
//           "threadId": "eac07ff7-c10d-4205-a03d-e5ef61ea8296"
//       },
//       {
//           "_createdAt": "2025-12-29T11:10:43Z",
//           "_id": "fe9e6b6b-e6bd-4381-83a2-94e8f91c5025",
//           "authorId": "pzLANnvXx",
//           "contentSnapshot": null,
//           "context": {
//               "notification": {
//                   "currentThreadLength": 2,
//                   "documentTitle": "Marine Risks (IMRNL)",
//                   "url": "https://axco.sanity.studio/production/intent/edit/id=92b2fa99-a6a9-4730-b292-9f78941fe6da;type=sectionContent;inspect=sanity%2Fcomments;comment=fe9e6b6b-e6bd-4381-83a2-94e8f91c5025/",
//                   "workspaceName": "production-workspace",
//                   "workspaceTitle": "Axco Studio (Production)"
//               },
//               "payload": {
//                   "workspace": "production-workspace"
//               },
//               "tool": ""
//           },
//           "lastEditedAt": "2025-12-29T11:10:46.357Z",
//           "message": [
//               {
//                   "_key": "ec18dc951408",
//                   "_type": "block",
//                   "children": [
//                       {
//                           "_key": "c7f4193a7b6a",
//                           "_type": "span",
//                           "marks": [],
//                           "text": "Note to writer: Hi Graham - I referred to the UN Trade \u0026 Development to update the table. I have also attached the link below for your reference.\n\nDue to the huge discrepancy in figures, would it be preferable to report the total fleet figure of 248 (without the breakdown)? I could amend the table accordingly. Please advise. Thank you.\n\nLink: https://unctadstat.unctad.org/datacentre/dataviewer/US.MerchantFleet"
//                       }
//                   ],
//                   "markDefs": [],
//                   "style": "normal"
//               }
//           ],
//           "parentCommentId": "a5d5c4f5-b044-4c47-8194-e0330d473080",
//           "reactions": [],
//           "status": "open",
//           "target": {
//               "document": {
//                   "_dataset": "production",
//                   "_projectId": "fokp4bp1",
//                   "_ref": "92b2fa99-a6a9-4730-b292-9f78941fe6da",
//                   "_type": "crossDatasetReference",
//                   "_weak": true
//               },
//               "documentRevisionId": "bacfc391-0625-4e2c-bf74-22de7dcc0c2f",
//               "documentType": "sectionContent",
//               "path": {
//                   "field": "content"
//               }
//           },
//           "threadId": "eac07ff7-c10d-4205-a03d-e5ef61ea8296"
//       },
//       {
//           "_createdAt": "2025-12-28T14:42:03Z",
//           "_id": "3a62f147-705b-4efc-a188-8c804a69676b",
//           "authorId": "p5LywPnGe",
//           "contentSnapshot": null,
//           "context": {
//               "notification": {
//                   "currentThreadLength": 2,
//                   "documentTitle": "Marine Risks (IMRNL)",
//                   "url": "https://axco.sanity.studio/production/intent/edit/id=92b2fa99-a6a9-4730-b292-9f78941fe6da;type=sectionContent;inspect=sanity%2Fcomments;comment=3a62f147-705b-4efc-a188-8c804a69676b/",
//                   "workspaceName": "production-workspace",
//                   "workspaceTitle": "Axco Studio (Production)"
//               },
//               "payload": {
//                   "workspace": "production-workspace"
//               },
//               "tool": ""
//           },
//           "lastEditedAt": null,
//           "message": [
//               {
//                   "_key": "d85c21ef4cd4",
//                   "_type": "block",
//                   "children": [
//                       {
//                           "_key": "42f8afa5e04b",
//                           "_type": "span",
//                           "marks": [],
//                           "text": "At the end of November 2025, 248 vessels sailed under a German flag and a further 1,391 under other flags (8,547,531 and 34,465,915 deadweight tonnage (DWT) respectively). "
//                       }
//                   ],
//                   "markDefs": [],
//                   "style": "normal"
//               }
//           ],
//           "parentCommentId": "a5d5c4f5-b044-4c47-8194-e0330d473080",
//           "reactions": [],
//           "status": "open",
//           "target": {
//               "document": {
//                   "_dataset": "production",
//                   "_projectId": "fokp4bp1",
//                   "_ref": "92b2fa99-a6a9-4730-b292-9f78941fe6da",
//                   "_type": "crossDatasetReference",
//                   "_weak": true
//               },
//               "documentRevisionId": "e05b3c72-a482-4872-b0ef-a89b99bb3804",
//               "documentType": "sectionContent",
//               "path": {
//                   "field": "content"
//               }
//           },
//           "threadId": "eac07ff7-c10d-4205-a03d-e5ef61ea8296"
//       },
//       {
//           "_createdAt": "2025-12-28T14:41:56Z",
//           "_id": "56d4c4a7-4be3-4fe2-aa4a-56c5069a8974",
//           "authorId": "p5LywPnGe",
//           "contentSnapshot": null,
//           "context": {
//               "notification": {
//                   "currentThreadLength": 2,
//                   "documentTitle": "Marine Risks (IMRNL)",
//                   "url": "https://axco.sanity.studio/production/intent/edit/id=92b2fa99-a6a9-4730-b292-9f78941fe6da;type=sectionContent;inspect=sanity%2Fcomments;comment=56d4c4a7-4be3-4fe2-aa4a-56c5069a8974/",
//                   "workspaceName": "production-workspace",
//                   "workspaceTitle": "Axco Studio (Production)"
//               },
//               "payload": {
//                   "workspace": "production-workspace"
//               },
//               "tool": ""
//           },
//           "lastEditedAt": null,
//           "message": [
//               {
//                   "_key": "12d95aed2915",
//                   "_type": "block",
//                   "children": [
//                       {
//                           "_key": "bd3b0d842462",
//                           "_type": "span",
//                           "marks": [],
//                           "text": " I have sourced (see MAT Summary and Trends):"
//                       }
//                   ],
//                   "markDefs": [],
//                   "style": "normal"
//               }
//           ],
//           "parentCommentId": "a5d5c4f5-b044-4c47-8194-e0330d473080",
//           "reactions": [],
//           "status": "open",
//           "target": {
//               "document": {
//                   "_dataset": "production",
//                   "_projectId": "fokp4bp1",
//                   "_ref": "92b2fa99-a6a9-4730-b292-9f78941fe6da",
//                   "_type": "crossDatasetReference",
//                   "_weak": true
//               },
//               "documentRevisionId": "e05b3c72-a482-4872-b0ef-a89b99bb3804",
//               "documentType": "sectionContent",
//               "path": {
//                   "field": "content"
//               }
//           },
//           "threadId": "eac07ff7-c10d-4205-a03d-e5ef61ea8296"
//       },
//       {
//           "_createdAt": "2025-12-28T14:40:18Z",
//           "_id": "bca891e9-6f54-4c9b-bdd8-476142c0ff3c",
//           "authorId": "p5LywPnGe",
//           "contentSnapshot": null,
//           "context": {
//               "notification": {
//                   "currentThreadLength": 2,
//                   "documentTitle": "Marine Risks (IMRNL)",
//                   "url": "https://axco.sanity.studio/production/intent/edit/id=92b2fa99-a6a9-4730-b292-9f78941fe6da;type=sectionContent;inspect=sanity%2Fcomments;comment=bca891e9-6f54-4c9b-bdd8-476142c0ff3c/",
//                   "workspaceName": "production-workspace",
//                   "workspaceTitle": "Axco Studio (Production)"
//               },
//               "payload": {
//                   "workspace": "production-workspace"
//               },
//               "tool": ""
//           },
//           "lastEditedAt": null,
//           "message": [
//               {
//                   "_key": "7ab8d5b31db2",
//                   "_type": "block",
//                   "children": [
//                       {
//                           "_key": "aef1e7b771ea",
//                           "_type": "span",
//                           "marks": [],
//                           "text": "Can you please check the source for the data iin this  table:"
//                       }
//                   ],
//                   "markDefs": [],
//                   "style": "normal"
//               }
//           ],
//           "parentCommentId": "a5d5c4f5-b044-4c47-8194-e0330d473080",
//           "reactions": [],
//           "status": "open",
//           "target": {
//               "document": {
//                   "_dataset": "production",
//                   "_projectId": "fokp4bp1",
//                   "_ref": "92b2fa99-a6a9-4730-b292-9f78941fe6da",
//                   "_type": "crossDatasetReference",
//                   "_weak": true
//               },
//               "documentRevisionId": "e05b3c72-a482-4872-b0ef-a89b99bb3804",
//               "documentType": "sectionContent",
//               "path": {
//                   "field": "content"
//               }
//           },
//           "threadId": "eac07ff7-c10d-4205-a03d-e5ef61ea8296"
//       },
//       {
//           "_createdAt": "2025-12-28T14:39:49Z",
//           "_id": "0433ead5-0bb2-42d1-80fe-514e422f09e4",
//           "authorId": "p5LywPnGe",
//           "contentSnapshot": null,
//           "context": {
//               "notification": {
//                   "currentThreadLength": 2,
//                   "documentTitle": "Marine Risks (IMRNL)",
//                   "url": "https://axco.sanity.studio/production/intent/edit/id=92b2fa99-a6a9-4730-b292-9f78941fe6da;type=sectionContent;inspect=sanity%2Fcomments;comment=0433ead5-0bb2-42d1-80fe-514e422f09e4/",
//                   "workspaceName": "production-workspace",
//                   "workspaceTitle": "Axco Studio (Production)"
//               },
//               "payload": {
//                   "workspace": "production-workspace"
//               },
//               "tool": ""
//           },
//           "lastEditedAt": null,
//           "message": [
//               {
//                   "_key": "251456b25815",
//                   "_type": "block",
//                   "children": [
//                       {
//                           "_key": "c5c7c51a0a6b",
//                           "_type": "span",
//                           "marks": [],
//                           "text": "Hi Clifford:"
//                       }
//                   ],
//                   "markDefs": [],
//                   "style": "normal"
//               }
//           ],
//           "parentCommentId": "a5d5c4f5-b044-4c47-8194-e0330d473080",
//           "reactions": [],
//           "status": "open",
//           "target": {
//               "document": {
//                   "_dataset": "production",
//                   "_projectId": "fokp4bp1",
//                   "_ref": "92b2fa99-a6a9-4730-b292-9f78941fe6da",
//                   "_type": "crossDatasetReference",
//                   "_weak": true
//               },
//               "documentRevisionId": "e05b3c72-a482-4872-b0ef-a89b99bb3804",
//               "documentType": "sectionContent",
//               "path": {
//                   "field": "content"
//               }
//           },
//           "threadId": "eac07ff7-c10d-4205-a03d-e5ef61ea8296"
//       },
//       {
//           "_createdAt": "2025-12-28T14:39:33Z",
//           "_id": "a5d5c4f5-b044-4c47-8194-e0330d473080",
//           "authorId": "p5LywPnGe",
//           "contentSnapshot": [
//               {
//                   "_key": "55368a53503d",
//                   "_type": "block",
//                   "children": [
//                       {
//                           "_key": "fae6bb015919",
//                           "_type": "span",
//                           "marks": [],
//                           "text": "The table below shows the number of marine vessels under the German flag of registration (by type of vessel) for the latest available full year."
//                       }
//                   ],
//                   "markDefs": [],
//                   "style": "normal"
//               }
//           ],
//           "context": {
//               "notification": {
//                   "currentThreadLength": 1,
//                   "documentTitle": "Marine Risks (IMRNL)",
//                   "url": "https://axco.sanity.studio/production/intent/edit/id=92b2fa99-a6a9-4730-b292-9f78941fe6da;type=sectionContent;inspect=sanity%2Fcomments;comment=a5d5c4f5-b044-4c47-8194-e0330d473080/",
//                   "workspaceName": "production-workspace",
//                   "workspaceTitle": "Axco Studio (Production)"
//               },
//               "payload": {
//                   "workspace": "production-workspace"
//               },
//               "tool": ""
//           },
//           "lastEditedAt": null,
//           "message": [
//               {
//                   "_key": "07b1aab873f6",
//                   "_type": "block",
//                   "children": [
//                       {
//                           "_key": "5642b54cbbc0",
//                           "_type": "span",
//                           "marks": [],
//                           "text": ""
//                       },
//                       {
//                           "_key": "57228bbb3230",
//                           "_type": "mention",
//                           "userId": "pzLANnvXx"
//                       },
//                       {
//                           "_key": "c55b2dc998c3",
//                           "_type": "span",
//                           "marks": [],
//                           "text": " "
//                       }
//                   ],
//                   "markDefs": [],
//                   "style": "normal"
//               }
//           ],
//           "parentCommentId": null,
//           "reactions": [],
//           "status": "open",
//           "target": {
//               "document": {
//                   "_dataset": "production",
//                   "_projectId": "fokp4bp1",
//                   "_ref": "92b2fa99-a6a9-4730-b292-9f78941fe6da",
//                   "_type": "crossDatasetReference",
//                   "_weak": true
//               },
//               "documentRevisionId": "e05b3c72-a482-4872-b0ef-a89b99bb3804",
//               "documentType": "sectionContent",
//               "path": {
//                   "field": "content",
//                   "selection": {
//                       "type": "text",
//                       "value": [
//                           {
//                               "_key": "55368a53503d",
//                               "text": "The table below shows the number of marine vessels under the German flag of registration (by type of vessel) for the latest available full year."
//                           }
//                       ]
//                   }
//               }
//           },
//           "threadId": "eac07ff7-c10d-4205-a03d-e5ef61ea8296"
//       }
//   ],
//   "syncTags": [
//       "s1:094aAw"
//   ],
//   "ms": 18
// }