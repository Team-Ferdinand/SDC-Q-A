explain analyze select answers.id,answers.body,answers.date_written, answers.answerer_name,
        answers.answerer_email,answers.reported,answers.helpful,
        (select json_agg(json_build_object('id',answers_photos.id,'url',answers_photos.url))photos
         from answers_photos
         where answers_photos.answer_id=answers.id
        )
        from answers
        where answers.question_id=629501 and answers.reported=false
        limit 20;







        explain analyze select q.id,q.body,q.date_written,q.asker_name,
        q.asker_email,q.reported,q.helpful,
        (select json_object_agg(a.id,
          json_build_object('id',a.id,'body',a.body,
          'date',a.date_written,
          'answerer_name',a.answerer_name,'answerer_email',a.answerer_email,
          'reported',a.reported,'helpful',a.helpful,'photos',
          (select json_agg(json_build_object('id',ap.id,'url',ap.url))photos
          from answers_photos as ap
          where ap.answer_id=a.id
         ) ))answers
           from answers as a
           where a.question_id=q.id and a.reported=false
          )
        from questions as q
        where q.product_id=1000119 and q.reported=false
        limit 20;




        select max(id) from answers;
