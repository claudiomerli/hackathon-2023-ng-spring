ent --debug bundle build --all
ent bundle pack
ent bundle publish
ent bundle install --conflict-strategy=OVERRIDE
