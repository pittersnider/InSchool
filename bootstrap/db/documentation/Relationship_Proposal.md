## Proposal
Aiming speed up the process time, due to small available time, some of these tables are generic. In the first moment, that isn't a problem, although the fact of a future improvement or refactorization is already noticed.  

- Table '**user**' to '**classroom**'  
  Uses the `user_classroom` to link `user_id` with the `classroom_id`

- Table '**user**' to '**exam**'  
  Uses the `user_exam` to link `user_id` with the `exam_id`
  
- Table '**classroom**' to '**exam**'  
  Uses the `user_exam` to link `classroom_id` with the `exam_id`

- Table '**user**' to '**contact_answer**' through '**contact**'  
  Uses the `contact_answer` to link `sender_id` with the `contact_id`

