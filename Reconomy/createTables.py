def main():
    command = input('what would you like to do?: ')
    if command == 'user':
        user()
    elif command == 'date':
        date()
    else: print('command do not exist!')

def user():
    userList = []
    with open('Name.txt', 'r') as file:
        userList = file.read().splitlines()
    with open('command.txt', 'a') as file:
        for users in userList:
            file.write(f"INSERT INTO `users`(`id`, `name`) VALUES ('','{users}');\n")
            print(f'Saved: {users}')

def date():
    date = ['Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag','Söndag']
    with open('date.txt', 'w', encoding='utf-8') as file:
        for i in date:
            file.write(f"INSERT INTO `message`(`id`, `Date`, `Message`) VALUES ('','{i}','');\n")

if __name__ == '__main__':
    main()