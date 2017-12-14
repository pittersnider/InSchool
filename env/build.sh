#!/bin/bash
echo "+++ BUILDING THE VIRTUAL MACHINE"
bash /project/env/vm/build.sh

echo "+++ BUILDING THE DATABASE"
bash /project/env/db/build.sh

echo "+++ ALL DONE. VAGRANT SSH' TO ENTER VIRTUAL MACHINE."

