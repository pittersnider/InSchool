## Proposal
Aiming speed up the process time, due to small available time, some of these tables are generic. In the first moment, that isn't a problem, although the fact of a future improvement or refactorization is already noticed.  
  
You should also be noted that this is a basic and raw structure; some another default columns will be included in every table (in an example, `createdAt`).

- Table '**user**'  
  `id, passport (invite-code), joined, name, email, role`

- Table '**classroom**'  
  `id, name, year, periods (json)`

- Table '**user_classroom**'  
  `user_id, classroom_id, active, createdAt`

- Table '**exam**'  
  `id, teacher_id, quarter, worth, subject, name`

- Table '**knowledge**'  
  `id, author_id, status, name, subject, tags, content, active`

- Table '**exam_knowledge**'  
  `exam_id, knowledge_id, createdAt`

- Table '**user_report**'  
  `user_id, quarter, detail, createdAt`

- Table '**contact**'  
  `id, author_id, responsible_id [null], status, name, subject`

- Table '**contact_answer**'  
  `id, contact_id, sender_id, from_author (bool), content, active`

- Table '**subscription**'  
  `id, author_id, active, type (jobs, rematricula) name, endsAt`

- Table '**subscription_request**'  
  `id, author_id, detail, attachment, status`

- Table '**language**'  
  `code, name, version, dictionary (json)`

- Table '**menu**'  
  `shift, weekday, name`