def main():
    userList = []
    with open('Name.txt', 'r') as file:
        userList = file.read().splitlines()
    with open('command.txt', 'a') as file:
        for users in userList:
            file.write(f"INSERT INTO `users`(`id`, `name`) VALUES ('','{users}');\n")
            print(f'Saved: {users}')

if __name__ == '__main__':
    main()