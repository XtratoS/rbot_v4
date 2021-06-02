# rbot_v4
## Core Functionality
### User Verification
- [ ] ID Verification
### Role Reaction
- [ ] addReactionRole <message_id> @role :emote:
- [ ] react <message_id> :emote:
### Levelup System
- [ ] expMap
- [ ] expRoleMap
- [ ] addExpRole
- [ ] removeExpRole
### Database
#### Database Layout
- [x] Guilds and Prefixes
#### Database Initial Functions
- [x] Database connection
- [ ] Database initialization
##### Channels to keep track of
- [ ] Channels to move deleted message from to Recycle Bin
- [x] Recycle Bin
- [ ] Modmail
## Commands
### Initialization Commands
- [ ] toggleRecyclableChannel <channel_id>
- [x] setRecycleBin <channel_id>
- [ ] setModMailChannel <channel_id>
- [ ] toggleModMailMember <user_id>
- [ ] role @role @member
  - Toggles a role for a member
- [ ] moveall <channel_name>
- [ ] toggleExpRole @role <exp_amount>
- [ ] expRoles
- [ ] expMap
### Normal Commands
- [ ] voteKick @member
- [ ] hangman
- [ ] addReminder
  - Adds a maximum of 8 1-time reminders
- [ ] addPeriodicReminder
  - Adds a maximum of 8 periodic reminders
- [ ] reminders
  - Shows all reminders and adds option to remove them